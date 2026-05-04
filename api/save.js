// api/save.js — Vercel Serverless Function
// Reads/writes data.json in the GitHub repo via GitHub API
// Env vars needed: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;
  const FILE_PATH = 'public/data.json';
  const API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // GET — read current data
  if (req.method === 'GET') {
    const r = await fetch(API, { headers });
    if (!r.ok) return res.status(500).json({ error: 'Failed to read data' });
    const file = await r.json();
    const content = JSON.parse(Buffer.from(file.content, 'base64').toString());
    return res.status(200).json({ data: content, sha: file.sha });
  }

  // POST — write updated data
  if (req.method === 'POST') {
    const { data, sha } = req.body;
    if (!data || !sha) return res.status(400).json({ error: 'Missing data or sha' });
    const encoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    const r = await fetch(API, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `Update finance data ${new Date().toISOString().slice(0,10)}`,
        content: encoded,
        sha,
      }),
    });
    if (!r.ok) {
      const err = await r.json();
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
