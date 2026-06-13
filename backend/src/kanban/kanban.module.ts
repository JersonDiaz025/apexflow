import { Module } from '@nestjs/common';
import { KanbanService } from '@/kanban/kanban.service';
import { KanbanGateway } from '@/kanban/kanban.gateway';
import { KanbanController } from '@/kanban/kanban.controller'

@Module({
  controllers: [KanbanController],
  providers: [KanbanService, KanbanGateway],
})
export class KanbanModule {}
