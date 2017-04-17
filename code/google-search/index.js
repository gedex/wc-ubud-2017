import { Builder, By, until } from 'selenium-webdriver';

const driver = new Builder().forBrowser( 'chrome' ).build();

driver.get( 'https://www.google.com/' );
driver.findElement( By.name( 'q' ) ).sendKeys( 'WordCamp Ubud' );
driver.findElement( By.name( 'btnG' ) ).click();
driver.wait( until.titleIs( 'WordCamp Ubud - Penelusuran Google' ), 1000 )
driver.sleep( 3000 );
driver.quit();
