<h1>README File </h1>
<h1> Table of Contents </h1>

- [Team AI-5](#team-ai-5)
  - [Proof of Concept](#proof-of-concept)
  - [Motivation](#motivation)
  - [Our Solution](#our-solution)
  - [User Stories](#user-stories)
  - [Features](#features)
    - [Proposed website features:](#proposed-website-features)
      - [Home Page](#home-page)
      - [About Page](#about-page)
      - [Login/Signup Page](#loginsignup-page)
      - [Footer](#footer)
      - [Profile Page](#profile-page)
      - [Event Creator](#event-creator)
      - [Generating a Code](#generating-a-code)
      - [Inputting a Code](#inputting-a-code)
      - [Selection of Dates](#selection-of-dates)
      - [Generating a Schedule](#generating-a-schedule)
  - [Program Flow](#program-flow)
  - [Component Interaction](#component-interaction)
  - [Timeline](#timeline)
  - [Tech Stack](#tech-stack)
  - [Firebase Database Structure](#firebase-database-structure)
  - [Software Engineering Practices](#software-engineering-practices)
  - [Project Log](#project-log)


# Team AI-5
Members: Lee Zhi Xuan, Johnathan Wee

Proposed Level of Achievement: Apollo 11

## Proof of Concept
Our Website can be accessed through the following link: 

We have some dummy events that you may use to reduce the hassle of joining events created by other Planners.
<ul> 	
	<li>Event Codes</li>
	<ul>
		<li> -N5_CF1k58WY_Jfh-buF </li>
		<li> -N5_CTm085WHPJx6XwYp </li>
		<li> -N5_D65OPMkQatU9CyFd </li>
	</ul>
</ul>

## Motivation
Have you ever experienced the difficulty of creating a schedule for an organisation/club that fully integrates the demands, preferences and availability of each employee/member? Almost every organisation and club will rely on a shift system to organise events/ensure that its operations run smoothly. However, the process of creating a schedule that caters to everyone's availability while having the meet the demands/requirements of their organisation (such as having a minimum number of shifts per month) can become very tedious and time-consuming. As the number of employees/members increase, the task at hand also gets exponentially harder.


Currently, most duty planning processes are done manually and there are limited tools available to speed up the process. Therefore, we felt that this repetitive process can be improved to increase efficiency.

## Our Solution
To help reduce the tedious process, we aim to create a duty planning program that helps our user organise shifts and schedules that takes in other people's preferences and availibility.

We opted to create a website (using React) to host our duty planning program as we felt that this was the simplest way for users to access our features.

Since our project targets a wide audience (varying from part-timers to employees and managers), we created a profile page that lists out all of the events that the Member is part of. This can assist Members in keeping track of all the events and schedules that they have. 

## User Stories
As a part-timer working in retail, I would like to have my preferences and availability factored in when taking up shifts.

As an employee, I want to be able to request for a change in the allocated shift (due to preference) and have the system suggest alternative shifts without creating conflicting schedules for other employees.

As a commanding officer or HR manager, I would want to be able to leave the scheduling for my soldiers or staff to be handled automatically.

As a commanding officer or HR manager, I want to be able to integrate our organisation’s preferences and rules (eg. no consecutive shifts) into the system to obtain a schedule catered to our organisation.

## Features
Our project will include the following features:

### Proposed website features:
#### Home Page
To attract the attention of our users, a simple page with our project goal will be used as the Home Page. The "Click to learn more" button will redirect the users to our About Page, which will include more details on our project.
![homepage](https://user-images.githubusercontent.com/88086170/173574517-03556645-67e9-4968-a7d2-6d75bce5139f.png)

#### About Page
As the content on the Home Page is kept to the minimum, the About Page will provide more information on our goal and the key features of our project that will help to solve their problems. The image below shows our goal:
![about](https://user-images.githubusercontent.com/88086170/175862476-c754bc9f-e14e-4107-af73-6ff79023d93b.png)


#### Login/Signup Page
The login/signup page will prompt for their particulars, and will serve as the gate for the following user-catered features. To check for authentication, we utilised the feature provided by Firebase which helps us store new emails and passwords on their database. The login/signup page will also display errors that might occur when users do not meet the requirements. For example, if the password used when signing up is less than 6 characters, a prompt will appear to explain the issue. 
![login](https://user-images.githubusercontent.com/88086170/175862742-7ba02d4e-3252-4d5a-ad1d-efc70adaa3c2.png)

#### Footer
A footer has also been attached to all of the pages mentioned above. Located at the bottom of the page, it displays some basic information and links are available to redirect visitors to our project code, posters and videos.
![footer](https://user-images.githubusercontent.com/88086170/175862604-d8eca759-eb0e-4714-a7f9-a8a3b7c7bc1f.png)

#### Profile Page
After logging in, the users will be directed to their profile page which will showcase their existing list of events that they are involved in. For new users, the list of events would be empty. Buttons for users to --create a new event, log out and input code-- will also be shown on the profile page. The profile page serves as an overview on the events and features. 
![profile page](https://user-images.githubusercontent.com/88086170/175941485-d8801c0c-e541-49ee-845e-4829e7cc47f1.png)


#### Event Creator
For the organisation to start the process of creating a schedule, they will be required to fill in the details and requirements of the event. The details entered will be shown to participants/members when they indicate their preferences and availability. The Start and End Dates will also serve as a block out feature, where Members will not be able to select dates that fall out of the range.
![event](https://user-images.githubusercontent.com/88086170/175896919-0a75ccd7-8fb3-4391-b914-b7d32aa49080.png)

#### Generating a Code
To share the event created by the user/organisation, all the planner has to do is to click on the button "View Code" beside the newly created event and the event code would be displayed on the screen. The planner can subsequently share the code on their communication channels, where participants/members can input the code to gain access to the event created.
![share_code](https://user-images.githubusercontent.com/88086170/175942416-8c25f440-640b-4410-9bc0-78934bf2f0e7.png)

#### Inputting a Code
Members/Participants that have recieved a code can use the "Input Code" button displayed in the profile page to gain access to the event that is being shared. Currently, we have not implemented a error catching system to catch invalid codes, which would cause the page to blank out. This will be fixed by Milestone 3.
![input_code](https://user-images.githubusercontent.com/88086170/175943037-4671b691-7e78-4f03-8410-116e2c4a7c3a.png)

#### Selection of Dates
When the "Choose Shifts" button is clicked in the Profile Page's list of events, the user will be brought to a page with a calendar and available dates for their choosing. 
![choose1](https://user-images.githubusercontent.com/88086170/175897634-e484fc90-9923-41be-9dc5-c6b1c3e60e0d.png)
When the date of interest is clicked, the shifts and a list of their selection will appear. The shifts that are selected will be added into the list on the right, which serves as a visual representation of all the selections that they have made so far.
![choose2](https://user-images.githubusercontent.com/88086170/175897980-b89b4692-c7e9-421a-ac99-2a297082d64b.png)
When the user is done with their selection, they can submit their inputs and selection by clicking on the Submit button. This will send the inputs into the Firebase real-time database that would subsequently be used to generate the schedule.

#### Generating a Schedule
When all inputs are receieved, the Planner can proceed to generate the schedule using the Plan button. As of Milestone 2, we are still unable to code out a perfectly working algorithm that generates a schedule as planned. When the schedule is generated, the shifts that are allocated to each user would appear on their respective calendars, which could be seen in their profile pages.

## Program Flow
![program flow](https://user-images.githubusercontent.com/88086170/175902254-7ed1e266-1004-4ec7-b1c0-78e5bd0f6690.png)

## Component Interaction
![component interaction](https://user-images.githubusercontent.com/88086170/175901714-51fbccd5-66b5-4f0f-8f1a-5492600c741d.png)

## Timeline

<table>
    <thead>
        <tr>
            <th>Task:</th>
            <th>Description:</th>
            <th>In-charge:</th>
            <th>Date:</th>
        </tr>
    </thead>
    <tbody>
	<tr>
            <td colspan=4> <b>Evaluation Milestone 1 (30 May 2022):</b>
		<ul>
			<li>Ideation</li>
			<li>Proof of concept</li>
			<ul>
				<li>Home Page</li>
				<li>Login/Register Page</li>
				<li>User Page</li>
				<li>Adding of events</li>
				<li>Basic Calendar display</li>
			</ul>
		</ul>
	    </td>
        </tr>
        <tr>
            <td>Research into relevant libraries required for project (React, CSS, html, Firebase)</td>
            <td>Familarisation of libraries through online lessons, videos and resources</td>
            <td>Zhi Xuan Johnathan</td>
            <td>13 - 20 May</td>
        </tr>
        <tr>
            <td rowspan=2>Login and Register pages</td>
            <td>Created an introductory page with registration and login function</td>
            <td>Johnathan</td>
            <td>20 - 23 May</td>
        </tr>
        <tr>
            <td>CSS styling for login and register page</td>
            <td>Zhi Xuan</td>
            <td>22 - 25 May</td>
        </tr>
        <tr>
            <td>Profile Creation</td>
            <td>Email is tied to one’s individual profile on our website</td>
            <td>Johnathan</td>
            <td>23 - 24 May</td>
        </tr>
	<tr>
            <td>Event Creation</td>
            <td>Create events customised with start and end dates, number of shifts and number of hours per shift</td>
            <td>Johnathan</td>
            <td>24 - 25 May</td>
        </tr>
	<tr>
            <td>Home Page</td>
            <td>Using CSS and html file to create a homepage</td>
            <td>Zhi Xuan</td>
            <td>22 - 29 May</td>
        </tr>				
	<tr>
            <td>Calendar creation</td>
            <td>Create a display that shows range of selected dates in a calendar form</td>
            <td>Johnathan</td>
            <td>27 - 29 May</td>
        </tr>
	<tr>
            <td colspan=4> <b>Evaluation Milestone 2: Working prototype of our duty generator (27 June)</b>
		<ul>
			<li>Distinguish profiles (between Planners and Members) </li>
			<li>Link profile information to Firebase realtime database </li>
			<li>Sending of emails to members after creation of event</li>
			<li>Generating schedule after inputs are taken </li>
			<li>Show recommended schedule </li>
		</ul>
	    </td>
        </tr>
        <tr>
            <td>Differentiating profiles</td>
            <td>Create different pages for planners and members</td>
            <td>Johnathan</td>
						<td rowspan=2>31 May - 7 Jun</td>
        </tr>
			  <tr>
            <td>Finalising design for pages in Milestone 1</td>
            <td>Complete CSS styling for webpages and features</td>
            <td>Zhi Xuan</td>
        </tr>
				<tr>
            <td>Sending emails for members to create a profile</td>
            <td>Notify members to create profiles in order to input preferences into the schedule</td>
            <td>Johnathan</td>
						<td>7 - 14 Jun</td>
        </tr>
				<tr>
            <td>Generating schedule after inputs are taken</td>
            <td>Code sorting algorithm to display the optimum schedule</td>
            <td>Zhi Xuan Johnathan</td>
						<td rowspan=3>14 - 25 Jun</td>
        </tr>
				<tr>
            <td>Show recommended schedule</td>
            <td>Allow profiles access to a shared schedule</td>
            <td>Johnathan</td>
        </tr>
				<tr>
            <td>Finalise styling for all features</td>
            <td>Complete CSS styling for all features</td>
            <td>Zhi Xuan</td>
        </tr>
	<tr>
            <td colspan=4> <b>Evaluation Milestone 3: Finalising features of our website (25 July)</b>
		<ul>
			<li>Feature of requesting for duty swaps</li>
			<li>Ability to group members and planners into organisations</li>
			<li>Improve UI</li>
		</ul>
	    </td>
        </tr>
				<tr>
            <td>Implementing duty swap feature</td>
            <td>Coordinate between two members to facilitate swapping</td>
            <td>Zhi Xuan Johnathan</td>
						<td>26 Jun - 6 Jul</td>
        </tr>
				<tr>
            <td>Grouping members and planners into organisations</td>
            <td>Abstract out organisations to ease the sharing of duty information</td>
            <td>Johnathan</td>
						<td>7 - 17 Jul</td>
        </tr>
				<tr>
            <td>Improving UI</td>
            <td>Make our website user friendly even on small screens</td>
            <td>Zhi Xuan</td>
						<td>18 - 25 Jul</td>
        </tr>
				<tr>
		<td colspan=4> <b> Splashdown: 24 Aug </b> </td>
        </tr>
    </tbody>
</table>

## Tech Stack
![tech_stack](https://user-images.githubusercontent.com/88086170/175878216-cbdbd51e-5a99-4994-afef-63616798d409.png)


## Firebase Database Structure
![firebase](https://user-images.githubusercontent.com/88086170/175911939-eced5141-aecb-41a7-a788-6b058c1e1f2e.png)

## Software Engineering Practices
<ul>
	<li>Version Control</li>
	<p>
Using Github and Git, we are able to implement version control within our project. In an event where the new code used to run encounters any unexpected issues, we are able to reset our code back to the previous version that would run as expected. This also allows us to keep track of the changes made to different files as the project progresses, and allows us to refer back to past approaches and methods.
	</p>
	<li>Continuous Integration</li>
	<p>
		To increase the efficiency and progress done on the project, we have adopted the practice of continuous integration. This allows both of the contributors to code at the same time (on different branches) and subsequently integrating the changes from both contributors into a final version. The branch 'main' has been used as the central hub for our project code and new changes merged into the working code.
	</p>
	<li>Design Usability</li>
	<p>
		As our website has a wide range of target audience that can vary in age, we decided to exclude unnecessary buttons and features within our app so that the main objectives of the project can be delivered effectively. 
	</p>
</ul>

## Project Log
<link>
	https://docs.google.com/spreadsheets/d/1OHVIYzQE0Wkcr0wnMOQEhwmHTUs43PNd9bNk9iyHXno/edit#gid=0
</link>
