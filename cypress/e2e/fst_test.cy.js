describe('Habr tests', () => {
  const hubMock = {
    statusCode: 200,
    body: {
      pagesCount: 1,
      hubIds: [
        'DIY',
      ],
      hubRefs: {
        DIY: {
          id: '21976',
          alias: 'Piy',
          titleHtml: 'Пиу-пиу-пиу',
          imageUrl: '//habrastorage.org/getpro/geektimes/hub/0ac/9b4/828/0ac9b48281cd7ba7401b4a4f5d9cd8d8.png',
          descriptionHtml: 'Укрощение кислорода и подводные камни терраформирования',
          relatedData: null,
          statistics: {
              subscribersCount: 460323,
              rating: 10000,
              authorsCount: 2427,
              postsCount: 5852,
          },
          commonTags: [
              'piy',
              'arduino',
              'ruvds_статьи',
              'puy-puy',
              'пиу-пиу',
              'esp32',
              'iot',
              'raspberry pi',
              'микроконтроллеры',
              'diy-проекты',
          ],
          isProfiled: false,
          isOfftop: false,
        },
      },
    },
  };


  it('Habs', () => {
    cy.visit('https://habr.com/ru/all/');
    cy.intercept('/kek/v2/hubs/?page=1', hubMock).as('request');
    cy.get('.tm-tabs a').contains('Хабы').click();
    cy.wait('@request');
    cy.get('.tm-hub__description').should('have.text', 'Укрощение кислорода и подводные камни терраформирования');
    cy.get('.tm-hub__title').should('have.text', 'Пиу-пиу-пиу');
    cy.get('.tm-hubs-list__hub-rating').should('include.text', '10000');
    cy.get('.tm-hubs-list__hub-subscribers').should('include.text', '460K');
  });

  it('Login negative', () => {
    cy.visit('https://www.tinkoff.ru/');
    cy.contains("Войти").click()
    cy.get('input[automation-id="phone-input"]').type('9150143369');
    cy.get('button[automation-id="button-submit"]').click();
    cy.get('input[automation-id="otp-input"]').type('1234');
    cy.get('span[automation-id="server-error"]').should('have.text', 'Введен неверный код');
  });
})