import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { KanbanModule } from '@/kanban/kanban.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    KanbanModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
