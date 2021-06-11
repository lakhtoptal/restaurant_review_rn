# Review Restaurants App

This test project is to evaluate skills of Lakhwidner Singh Virk by Toptal

Built in React-native. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development.

## Toptal Project Requirements
	•	User must be able to create an account and log in. (If a mobile application, this means that more users can use the app from the same phone).
	•	Implement 3 roles with different permission levels
	•	    * Regular User: Can rate and leave a comment for a restaurant
	•	    * Owner: Can create restaurants and reply to comments about owned restaurants
	•	    * Admin: Can edit/delete all users, restaurants, comments, and reviews
	•	Reviews should have:
	•	    * A 5 star based rating
	•	    * Date of the visit
	•	    * Comment 
	•	When a Regular User logs in, they will see a Restaurant List ordered by Average Rating
	•	When an Owner logs in, they will see a Restaurant List - only the ones owned by them, and the reviews pending reply
	•	Owners can reply to each review once
	•	Restaurants detailed view should have:
	•	     The overall average rating
	•	    * The highest rated review
	•	    * The lowest rated review
	•	    * Last reviews with rate, comment, and reply
	•	Restaurant List can be filtered by Rating


## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) for string localization.
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/usage) as storage solution.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Folder structure

This project follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `constants`: Folder to store any kind of constant that you have.
  - `controllers`: Folder to store all your network logic (you should have one controller per resource).
  - `hooks`: Folder to custom hooks for particular screen related or generic hooks to use anywhere.
  - `localization`: Folder to store the languages files.
  - `navigation`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its own folder, and inside it a file for its code and a separate one for the styles and tests.
      - `Screen.js`
      - `Screen.styles.js`
      - `Screen.test.js`
  - `state`: Folder to manage state of the app to keep everything related to state management.
    - `actions`: This folder contains all actions that can be dispatched to redux.
    - `reducers`: This folder should have all your reducers, and expose the combined result using its `index.js`
    - `selectors`: Folder to store your selectors for each reducer.
    - `storage`: Folder that contains the application storage logic.
    - `store`: Folder to put all redux middlewares and the store.
  - `test-utils`: Folder to store tests-related utilities and components.
  - `theme`: Folder to store all the styling concerns related to the application theme.
  - `App.js`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.

## Splash screen customization

To customize the splash screen (logo and background color) use the CLI provided in the [official docs](https://github.com/zoontek/react-native-bootsplash#assets-generation).

## Styleguide

For coding styling we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).
