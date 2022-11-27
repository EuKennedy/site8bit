window.sr = ScrollReveal({ reset: true});

sr.reveal('body, .conteudo-two, .conteudo-tres', { duration: 1700 });

new TypeIt(".animated", {
    waitUntilVisible: true,
    speed: 60,
  })
    .type("está pronto para sua viagem entre as galáxias.")
    .exec(async () => {
      
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve();
        }, 1000);
        
      });
    })
    .type(" Ou você tem medo do desconhecido?") 
    .pause(3000)
    .delete(34)
    .pause(1000)
    .type(" Se o medo não lhe afeta, clique no botão abaixo.")
    .go();

    
    
    