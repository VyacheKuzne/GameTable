import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
// import { chatMessage } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket): Promise<void> {
    const messages = await this.chatService.getMessages();
    client.emit('messageHistory', messages);
  }

  afterInit() {
    console.log('WebSocket сервер инициализирован');
  }

  handleConnection(client: Socket) {
    console.log('Клиент подключён:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Клиент отключён:', client.id);
  }
}
