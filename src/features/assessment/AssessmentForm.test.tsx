import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { AssessmentForm } from './AssessmentForm';

describe('AssessmentForm', () => {
  it('loads sample patient data into the form', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider>
        <DatesProvider settings={{ locale: 'en' }}>
          <AssessmentForm />
        </DatesProvider>
      </MantineProvider>
    );

    await user.click(screen.getByRole('button', { name: /load sample patient/i }));

    expect(screen.getByDisplayValue('MRN-004821')).toBeTruthy();
    expect(screen.getByDisplayValue('Sushila Deshpande')).toBeTruthy();
  });

  it('submits valid sample data and displays the saved assessment', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider>
        <DatesProvider settings={{ locale: 'en' }}>
          <AssessmentForm />
        </DatesProvider>
      </MantineProvider>
    );

    await user.click(screen.getByRole('button', { name: /load sample patient/i }));

    await user.click(screen.getByRole('button', { name: /save assessment/i }));

    await waitFor(
      () => {
        expect(screen.getByRole('status').textContent).toContain('Assessment saved successfully');
      },
      { timeout: 2000 }
    );

    expect(screen.getByText(/"MRN-004821"/)).toBeTruthy();
  });
});
