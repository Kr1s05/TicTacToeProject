export function Info() {
  return (
    <div key="1" className="w-full py-6 space-y-6">
      <div className="container space-y-2 text-center px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Морски шах
        </h1>
        <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Морският шах е класическа игра, известна със своята простота. Това е
          игра, която е лесна за научаване, но предизвикателна за овладяване.
          Ето едно ръководство, което ще ви помогне да започнете.
        </p>
      </div>
      <div className="container grid md:grid-cols-[200px_1fr] items-start gap-6 md:gap-12 lg:gap-24">
        <div className="grid grid-cols-3 items-center justify-center gap-2 text-center">
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
        </div>
        <div className="grid grid-cols-1 items-start gap-1 text-gray-500 dark:text-gray-400">
          <div>
            Играчът X започва играта, като поставя своя знак в някое от 9-те
            квадратчета.
          </div>
          <div>
            След това играчът О поема своя ход, като поставя своя знак в празно
            квадратче.
          </div>
          <div>
            Играта продължава, като играчите се редуват, докато един от тях не
            получи 3 свои знака подред (хоризонтално, вертикално или диагонално)
            или докато всички 9 квадрата не бъдат запълнени без победител, което
            води до равенство.
          </div>
        </div>
      </div>
      <div className="container grid items-start gap-6 md:grid-cols-2 md:gap-12 lg:gap-24">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Печеливши стратегии и съвети</h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400">
            <p>
              - Обърнете внимание на ходовете на противника си и му попречете да
              получи три поредни удара.
            </p>
            <p>
              - Търсете възможности за създаване на собствени печеливши линии,
              докато блокирате противника.
            </p>
            <p>
              - Централният квадрат е стратегическа начална позиция, тъй като
              предоставя най-много възможности за създаване на печеливши линии.
            </p>
            <p>
              - Ако противникът ви заеме ъглов квадрат, вземането на центъра е
              добър ход, за да запазите контрола върху дъската.
            </p>
          </div>
        </div>
        <div>
          <h3>Информация за връзка:</h3>
          <p className="pl-6">
            Имейл: support@tictactoe-online.bg
            <p />
          </p>
        </div>
      </div>
    </div>
  );
}
