import 'dotenv/config';
import { PrismaService } from '../src/prisma/prisma.service';

const clases = [
  { id: 1, nombre: 'Yoga', duracionMin: 60 },
  { id: 2, nombre: 'Pilates', duracionMin: 60 },
  { id: 3, nombre: 'Spinning', duracionMin: 60 },
];

const horarios = [
  { id: 1, claseId: 1, dia: 'lunes', horaInicio: '07:00', cupoMaximo: 2, entrenador: 'Ana Robles' },
  { id: 2, claseId: 1, dia: 'miercoles', horaInicio: '07:00', cupoMaximo: 3, entrenador: 'Ana Robles' },
  { id: 3, claseId: 2, dia: 'martes', horaInicio: '19:00', cupoMaximo: 4, entrenador: 'Luis Fierro' },
];

const miembros = [
  { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
  { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
  { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
];

async function seed(): Promise<void> {
  const prisma = new PrismaService();
  try {
    await prisma.$connect();
    if (process.env['RESET_DEMO_DATA'] === '1') {
      await prisma.inscripcion.deleteMany();
    }

    for (const clase of clases) {
      await prisma.clase.upsert({ where: { id: clase.id }, create: clase, update: clase });
    }
    for (const miembro of miembros) {
      await prisma.miembro.upsert({ where: { id: miembro.id }, create: miembro, update: miembro });
    }
    for (const horario of horarios) {
      await prisma.horario.upsert({ where: { id: horario.id }, create: horario, update: horario });
    }
  } finally {
    await prisma.$disconnect();
  }
}

void seed();