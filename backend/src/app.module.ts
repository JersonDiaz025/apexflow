import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KanbanModule } from '@/kanban/kanban.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KanbanModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
