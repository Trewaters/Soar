# Soar with Happy Yoga, like a leaf on the wind.

version 0.1.0 or [version badge](https://badge.fury.io/)

App used to find and track Yoga practice. Find poses, create flows, and track progress. For beginners and experts alike. Created by a yoga instructor for yoga instructors and students.

Found yoga poses [here](https://www.pocketyoga.com/pose/)

## Getting Started

### What the app should do?

#### Landing page

**Flow**

- Record and practice postures.

**Asana Postures**

- Show Yoga postures and some details about the posture like names, description, etc.

**Meditaiton**

- TBD

**Mantra**

- TBD

**Breathwork**

- TBD

#### Landing page

- Goals (long term), Today's workout (present day), Historical (past) practice

### Why is this app useful?

Used as an aid in anyones active yoga practice. This app won't get you started doing yoga but if you are a yogi, instructor, or student this app is for you.

## CREDIT

[Bishop Fox - Cybersecurity Style Guide - v1.1] (https://www.bishopfox.com/blog/2018/02/hello-world-introducing-the-bishop-fox-cybersecurity-style-guide/)

### Built With

- This project was generated with [NextJS](https://nextjs.org/docs) version 13.
- Material MUI

## CONTRIBUTIONS

Solo project so far. Code and graphic design contributors are welcome and encouraged to help. Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to me. (I will copy their instructions when I get time, but for now ditto to what they say)

## Authors

- **Tre' Grisby** - _Initial work_ - [trewaters](https://gitconnected.com/trewaters)

See also the list of [contributors](https://github.com/) who participated in this project.

## License

This project is licensed under the _GNU Affero General Public License v3.0_ - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- "I tip my hat to anyone whose code was used!" npm gives me a lot of people to thank!
- Special thank you to my mom, wife, and daughter! Without their love and support this would gone nowhere.
- Gratitude is the attitude!

## NOTES

- Timeline: I started this in July 2023. I hope to have a MVP by the end of the year. I am working on this in my spare time, so it may take longer. I am also learning NextJS as I go, so that will slow me down as well.

### Current Goals

- **Feature Goal**, record personal yoga practice in app.
- **Posture Card**, The Card comes up on Search. Polish the look of it.
- **Top Navigation**, Use a component for Top Navigation.
- **Header**, Make a header component.

### Known Bugs

No Known Bugs!

What you are experiencing is a feature 😉 ! Open a [github issue](https://github.com/Trewaters/soar/issues) if you disagree.

## Branches

1. [`develop`](https://soar-develop.vercel.app/) - active work
2. [`main`](https://soar-main.vercel.app/) – stable branch, create develop from this but only merge stable branches (publised to Vercel)
3. [`version_stable`](https://soar-jade.vercel.app/) - stable version this is the stable build of the most current version I am working on.
4. Feature/… - any feature I am working on that could go back into main when complete.
   `version_010` - release version 0.1.0.

The "version" branches are locked after release.

I follow Semantic Versioning for releases. [Read more here](https://semver.org/) ...**[TLDR](https://semver.org/#spec-item-2)**: _"A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor version, and Z is the patch version. Each element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0._

## Milestones

- [ ] 1.0.0 - MVP ( 4 sections, each with material).
- [ ] 2.0.0 - Create User Profiles and allow them to save their progress
- [ ] 2.x.0 - User Profile Customizations
- [ ] 2.x.0 - Users can Add more poses, etc.
- [ ] 2.x.0 - Users can create custom flows
- [ ] 2.x.0 - Users can create journal about Meditations
- [ ] 2.x.0 - Users can create custom Mantras

# DEVELOPER SECTION

## Prerequesites

Prereqs to work on this project..._(wip)_

## Installing

..._(wip)_

## Tests

..._(wip)_

## Coding Style

..._(wip)_

1. Prettier

## Deployment

- Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Development server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running unit tests

execute the unit tests via **Jest** [Jest](https://jestjs.io/).

## Running end-to-end tests

execute the end-to-end tests via **?Test Kit** [Protractor](http://www.protractortest.org/).

## Linting

1. Eslint rules

## "Pushing good code"

QUESTION: "Am I pushing good code?"

_If you *Answer yes* to everything on the list below then you are pushing GREAT CODE!_

1. `npm run dev` and there aren't any errors in the server terminal or client (web browser) console.
2. `npm run build` no breaking build errors. Warnings are acceptable but should be minimized. Errors are not acceptable.
3. `npm run cover` to make sure no unit test are failing. Coverage goal is (A) 100%, (B) 90%, (C) 80%.
4. Push `develop` branch to hosting. Then check how the app works on the web. Test with desktop and mobile device. Again checking the client (web browser) console for errors. "Click things and navigate around the app" especially any features your code touches.

## Further help
