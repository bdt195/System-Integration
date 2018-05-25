<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('/books', 'BookController');

Route::resource('/categories', 'BookController');

Route::resource('/issues', 'IssueController');

// Route::group(['before' => 'guest'], function() {
 
// 	// Sign in (GET) 
// 	Route::get('account/sign-in', [
// 		'as' 	=> 'account-sign-in',
// 		'uses'	=> 'AccountController@getSignIn'
// 	]);

// 	// Create an account (GET) 
// 	Route::get('account/create', [
// 		'as' 	=> 'account-create',
// 		'uses' 	=> 'AccountController@getCreate'
// 	]);

// 	// Student Registeration form 
// 	Route::get('student/registration', [
// 		'as' 	=> 'student-registration',
// 		'uses' 	=> 'StudentController@getRegistration'
// 	]);

// 	// CSRF protection 
// 	Route::group(['before' => 'csrf'], function() {

// 		// Create an account (POST) 
// 		Route::post('account/create', [
// 			'as' => 'account-create-post',
// 			'uses' => 'AccountController@postCreate'
// 		]);

// 		// Sign in (POST) 
// 		Route::post('account/sign-in', [
// 			'as' => 'account-sign-in-post',
// 			'uses' => 'AccountController@postSignIn'
// 		]);

// 		// Registration(POST) 
// 		Route::post('student/registration', [
// 			'as' => 'student-registration-post',
// 			'uses' => 'StudentController@postRegistration'
// 		]);		

// 	});
    
//     // Render search books panel
//     Route::get('/books/search', [
//         'as' => 'search-book',
//         'uses' => 'BookController@searchBook'
// 	]);    
	
// });


// // Authenticated group 
// Route::group(['before' => 'auth'], function() {

// 	// Home Page of Control Panel
// 	Route::get('/',[
// 		'as' 	=> 'home',
// 		'uses'	=> 'HomeController@home'
// 	]);	

// 	// Render Add Books panel
//     Route::get('book/add', [
//         'as' => 'add-books',
//         'uses' => 'BookController@renderAddBooks'
// 	]);

// 	// Render All Books panel
//     Route::get('/all-books', [
//         'as' => 'all-books',
//         'uses' => 'BookController@renderAllBooks'
// 	]);

// 	// Students
//     Route::get('/registered-students', [
//         'as' => 'registered-students',
//         'uses' => 'StudentController@renderStudents'
// 	]);

//     // Render students approval panel
//     Route::get('/students-for-approval', [
//         'as' => 'students-for-approval',
//         'uses' => 'StudentController@renderApprovalStudents'
// 	]);

//     // Main students Controlller resource
//     Route::resource('/student', 'StudentController');

//     // Issue Logs
//     Route::get('/issue-return', [
//         'as' => 'issue-return',
//         'uses' => 'LogController@renderIssueReturn'
// 	]);

//     // Render logs panel
//     Route::get('/currently-issued', [
//         'as' => 'currently-issued',
//         'uses' => 'LogController@renderLogs'
// 	]);

//     // Main Logs Controlller resource
//     Route::resource('/issue-log', 'LogController');

// 	// Sign out (GET) 
//     Route::get('/sign-out', [
//     	'as' => 'account-sign-out',
// 		'uses' => 'AccountController@getSignOut'
// 	]);
// });
