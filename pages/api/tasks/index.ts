import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }] });
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || title.trim().length < 3) return res.status(400).json({ error: 'Título inválido' });

    const newTask = await prisma.task.create({ data: { title: title.trim() } });
    res.status(201).json(newTask);
  } else {
    res.status(405).end();
  }
}
