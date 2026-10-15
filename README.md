# Geriatric Care Assessment Form

A React and TypeScript application for recording geriatric care assessments, with schema-based validation using Zod and Mantine UI components.

## Features

- Patient details and Medical Record Number (MRN) validation
- Date of birth and assessment date validation
- Mobility status selection
- Barthel Index validation (0–100, in increments of 5)
- Medication count validation and pharmacist review requirements
- Follow-up date validation
- Mandatory consent confirmation
- Sample patient data for demonstration
- Validated assessment output on successful submission

## Tech Stack

- React 19
- TypeScript
- Mantine UI, Form, and Dates
- Zod
- Vitest
- React Testing Library
- Vite Plus

## Prerequisites

- Node.js compatible with the project dependencies
- Yarn 4.18.1

## Installation

```bash
yarn install
```

## Development

```bash
yarn dev
```

Open the local URL printed in the terminal.

## Testing

Run the complete test suite:

```bash
yarn vitest
```

Run the complete quality checks and production build:

```bash
yarn test
```

## Production Build

```bash
yarn build
```

The production output is generated in the `dist` directory.

## Notes

The sample patient is fictional and intended for demonstration only.

## Submission

- GitHub Repository: 
- Live Demo: 
- Time Spent: 1:23 hrs
- Outstanding Items: None