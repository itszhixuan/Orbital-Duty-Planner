# Team AI-5
Members: Lee Zhi Xuan, Johnathan Wee

Proposed Level of Achievement: Apollo 11

## Motivation
Have you ever experienced the difficulty of creating a schedule for an organisation/club that fully integrates the demands, preferences and availability of each employee/member? Almost every organisation and club will rely on a shift system to organise events/ensure that its operations run smoothly. However, the process of creating a schedule that caters to everyone's availability while having the meet the demands/requirements of their organisation (such as having a minimum number of shifts per month) can become very tedious and time-consuming. As the number of employees/members increase, the task at hand also gets exponentially harder.

## Our Solution
To help reduce the tedious process, we aim to create a duty planning program that helps our user organise shifts and schedules that takes in other people's preferences and availibility.

The src folder houses source codes and components that are available on our website.

## User Stories
As a part-timer working in retail, I would like to have my preferences and availability factored in when taking up shifts.

As an employee, I want to be able to request for a change in the allocated shift (due to preference) and have the system suggest alternative shifts without creating conflicting schedules for other employees.

As a commanding officer or HR manager, I would want to be able to leave the scheduling for my soldiers or staff to be handled automatically.

As a commanding officer or HR manager, I want to be able to integrate our organisation’s preferences and rules (eg. no consecutive shifts) into the system to obtain a schedule catered to our organisation.

## Features
Our project will include the following features:

### Proposed website features:
#### Home Page
To attract the attention of our users, a simple page with our project goal will be used as the Home Page. 
![homepage](https://user-images.githubusercontent.com/88086170/173574517-03556645-67e9-4968-a7d2-6d75bce5139f.png)

#### About Page
As the content on the Home Page is kept to the minimum, the About Page will provide more information on our goal and the key features of our project that will help to solve their problems.

#### Login/Signup Page
The login/signup page will prompt for their particulars, and will serve as the gate for the following user-catered features. To check for authentication, we utilised the feature provided by Firebase which helps us store new emails and passwords on their database.

#### Profile Page
After logging in, the users will be directed to their profile page which will showcase their existing list of events that they are involved in. For new users, the list of events would be empty. Buttons for users to create a new event and log out will also be shown on the profile page. The profile page serves as an overview on the events and features.
![profile page](https://user-images.githubusercontent.com/88086170/173577609-8c252814-d207-425e-a7b9-1cc7abd8bd30.png)

#### Event Creator
For the organisation to start the process of creating a schedule, they will be required to fill in the details and requirements of the event. The details entered will be shown to participants/members when they indicate their preferences and availability.

---------------------Incomplete------------------------------

### Timeline

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
            <td>Johnathan Zhi Xuan</td>
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
            <td>Johnathan Zhi Xuan</td>
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






