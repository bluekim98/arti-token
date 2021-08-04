import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { ConfigModule } from '@nestjs/config';

describe('TokenService', () => {
  jest.setTimeout(100000);
  let tokenService: TokenService;
  const owner = '0x9b578e36F0647C39622BED0Bf60c7AcA4ed277F5';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [TokenService],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  it('createToken', async () => {
    await tokenService.connect();
    const beforeBalance: number = await tokenService.balanceOf(owner);
    const res = await tokenService.createToken(owner);
    const afterBalance: number = await tokenService.balanceOf(owner);
    expect(Number(beforeBalance) + 1).toBe(Number(afterBalance));
  });
});
