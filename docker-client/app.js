import express from 'express';
import cors from 'cors';
import fs from "fs/promises";
import os from "os";
import path from 'path';
import { writeFileSync } from 'fs';
import Docker from "dockerode";

const app = express();

const dockerClient = new Docker();

app.use(cors());
app.use(express.json());

const TIMEOUT_MS = 10_000; // 10 seconds
const TIMEOUT_RESULT = 1234;

const languagesConfig = {
	"C": { fileName: "main.c", cmd: ["sh", "-c", "gcc /code/main.c -o /tmp/a.out && /tmp/a.out"] },
	"Python": { fileName: "main.py", cmd: ["sh", "-c", "python3 /code/main.py"] },
	"JavaScript": { fileName: "main.js", cmd: ["sh", "-c", "node /code/main.js"] },
}

app.post('/run', async (req, res) => {
	const { code, lang } = req.body;

	if (!(lang in languagesConfig))
		return res.status(400).json({ error: "Bad request: Language not specified or not supported" });

	let submissionDir = null;
	let container = null;
	try {
		submissionDir = await fs.mkdtemp(path.join(os.tmpdir(), "rcee-submission-"));
		writeFileSync(path.join(submissionDir, languagesConfig[lang].fileName), code || "");
		await fs.chown(submissionDir, 1000, 1000);
		await fs.chown(path.join(submissionDir, languagesConfig[lang].fileName), 1000, 1000);

		const containerOptions = {
			Image: "mc-sandbox",
			Tty: true,
			Cmd: languagesConfig[lang].cmd,
			HostConfig: {
				Binds: [`${submissionDir}:/code:ro`],

				NanoCpus: 1_000_000_000, // 1 core
				Memory: 128 * 1024 * 1024, // 128 MB
				MemorySwap: 128 * 1024 * 1024,
				PidsLimit: 64,
				CapDrop: ["ALL"], // Drop all Linux capabilities
				NetworkMode: "none",
				ReadonlyRootfs: true,
				Tmpfs: {
					"/tmp": "rw,exec,nosuid,size=64m"
				},
				SecurityOpt: ["no-new-privileges"],
			},
		};

		container = await dockerClient.createContainer(containerOptions);
		await container.start();

		const waitPromise = container.wait();
		const timeoutPromise = new Promise((resolve, _) => {
			setTimeout(() => resolve(TIMEOUT_RESULT), TIMEOUT_MS);
		});

		const t = await Promise.race([waitPromise, timeoutPromise]);
		let logs = await container.logs({ stdout: true, stderr: true });
		if (t === TIMEOUT_RESULT)
			logs += "Execution taking too long";

		res.json({ output: logs.toString() });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Something went wrong." });
	} finally {
		if (container)
			container.remove({ force: true }).catch(() => { });
		if (submissionDir)
			fs.rm(submissionDir, { recursive: true, force: true }).catch(() => { });
	}
});

app.listen(8000, () => console.log('Server Started On Port 8000'));  
