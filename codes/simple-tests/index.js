import { Builder, By, until } from 'selenium-webdriver';
import assert from 'selenium-webdriver/testing/assert';
import config from 'config';
import test from 'selenium-webdriver/testing';

// Feature.
test.describe( 'log in as a user', function() {
	let driver;

	this.timeout( config.get( 'timeout.test' ) );

	test.before( function() {
		driver = new Builder().forBrowser( 'chrome' ).build();
	} );

	test.after( function() {
		driver.quit();
	} );

	// Scenario
	test.describe( 'allows user login via wp-login.php page', function() {
		// Given I visit http://example/wp-login.php
		test.before( function() {
			driver.get( config.get( 'url' ) + '/wp-login.php' );
		} );

		// When I do some actions to log in
		test.before( function() {
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
		test.it( 'redirects user to /wp-admin/', function() {
			const url = config.get( 'url' );
			assert( driver.getCurrentUrl() ).equalTo( url + '/wp-admin/' );
		} );

		// ...And
		test.it( 'displays "Dashboard" in the title', function() {
			assert( driver.getTitle() ).matches( /^Dashboard/ );
		} );
	} );
} );
