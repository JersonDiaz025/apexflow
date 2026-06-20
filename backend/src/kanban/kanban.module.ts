import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { KanbanService } from '@/kanban/kanban.service';
import { KanbanGateway } from '@/kanban/kanban.gateway';
import { KanbanController } from '@/kanban/kanban.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [KanbanController],
  providers: [KanbanService, KanbanGateway],
})
export class KanbanModule {}
