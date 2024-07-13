interface Card {
    title: string;
    description: string;
    imageUrl?: string;
  }
  
  interface Props {
    cards: Card[];
  }
  
  const IMG_PLACEHOLDER: Card[] = Array(30).fill(0).map(() => ({
    imageUrl: "https://via.placeholder.com/300",
    title: "Card Title",
    description: "This is a placeholder description for the card.",
  }));
  
  function CardCarousel({ cards = IMG_PLACEHOLDER }: Props) {
    let container: HTMLDivElement | null = null;
    let intervalId: number | null = null;
  
    // Função para mover automaticamente os cards
    const autoScroll = () => {
      if (container) {
        container.scrollLeft += 2; // Ajuste a velocidade de rolagem conforme necessário
      }
    };
  
    // Iniciar a rolagem automática ao montar o componente
    const startAutoScroll = () => {
      intervalId = setInterval(autoScroll, 50); // Intervalo de rolagem
    };
  
    // Parar a rolagem automática ao desmontar o componente
    const stopAutoScroll = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  
    // Iniciar a rolagem automática quando o componente é montado
    startAutoScroll();
  
    return (
      <div className="lg:container lg:mx-auto w-full py-6 lg:py-14">
        <div className="flex flex-col gap-12 bg-[#FFFBF4]">
          <p className="text-center text-lg font-bold mb-4">Card Carousel</p>
          <div className="relative w-full overflow-hidden h-80">
            <div
              ref={ref => container = ref}
              className="animate-sliding absolute top-0 left-0 flex"
              style={{ whiteSpace: "nowrap" }}
            >
              {cards.map((card, index) => (
                <div key={index} className="w-64 bg-white shadow-md border text-center border-[#F71970] rounded-lg p-4 mx-4 inline-block">
                  {card.imageUrl && (
                    <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                  )}
                  <h2 className="text-lg font-bold">{card.title}</h2>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardCarousel;
  