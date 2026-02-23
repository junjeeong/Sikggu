import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma', // schema.prisma 파일 경로
  migrations: {
    path: './migrations', // 마이그레이션 파일이 저장될 폴더
  },
  datasource: {
    url: env('DATABASE_URL'), // .env에서 읽어올 환경변수 이름
  },
});
