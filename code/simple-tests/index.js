import { Builder, By, until } from 'selenium-webdriver';
import assert from 'selenium-webdriver/testing/assert';
import config from 'config';
import test from 'selenium-webdriver/testing';

// Feature.
test.describe( 'user log in', function() {
	let driver;

	this.timeout( config.get( 'timeout.test' ) );

	test.before( () => {
		driver = new Builder().forBrowser( 'chrome' ).build();
	} );

	test.after( () => {
		driver.quit();
	} );

	// Scenario.
	test.describe( 'allows user log in via wp-login.php page', () => {
		// Given log in page at /wp-login.php
		test.before( () => {
			driver.get( config.get( 'url' ) + '/wp-login.php' );
		} );

		// When...
		test.before( () => {
			const username = config.get( 'users.admin.username' );
			const password = config.get( 'users.admin.password' );
			const timeout = config.get( 'timeout.locateElement' );

			// I fill my username into username field.
			driver.wait( until.elementLocated( By.id( 'user_login' ) ), timeout );
			driver.findElement( By.id( 'user_login' ) ).sendKeys( username );

			// I fill my password into password field.
			driver.wait( until.elementLocated( By.id( 'user_pass' ) ), timeout );
			driver.findElement( By.id( 'user_pass' ) ).sendKeys( password );

			// I click Log In button.
			driver.wait( until.elementLocated( By.id( 'wp-submit' ) ), timeout );
			driver.findElement( By.id( 'wp-submit' ) ).click();
		} );

		// Then...
		test.it( 'I redirected to /wp-admin/', () => {
			const url = config.get( 'url' );
			assert( driver.getCurrentUrl() ).equalTo( url + '/wp-admin/' );
		} );

		// ...And
		test.it( 'I see "Dashboard" in the title', () => {
			assert( driver.getTitle() ).matches( /^Dashboard/ );
		} );
	} );
} );
