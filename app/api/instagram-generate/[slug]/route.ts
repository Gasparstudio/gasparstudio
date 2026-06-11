import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

const SCRIPTS: Record<string, string> = {
  face: 'scripts/generate-slides-face.ts',
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const script = SCRIPTS[slug]

  if (!script) {
    return Response.json({ error: 'Unknown slug' }, { status: 404 })
  }

  try {
    const cwd = path.resolve(process.cwd())
    const { stdout } = await execAsync(`npx tsx ${script}`, { cwd, timeout: 60000 })
    return Response.json({ success: true, output: stdout })
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 })
  }
}
