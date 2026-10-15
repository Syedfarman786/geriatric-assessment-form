// import dayjs from 'dayjs';
import { useState } from 'react';
// import { zodResolver } from 'mantine-form-zod-resolver';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';
// import type { Assessment } from './schema';

type AssessmentValues = {
  mrn: string;
  patientName: string;
  dateOfBirth: string | null;
  assessmentDate: string | null;
  mobility: string | null;
  barthelIndex: number | string;
  medicationCount: number | string;
  pharmacistReviewRequested: boolean;
  followUpDate: string | null;
  consentObtained: boolean;
};

const initialValues: AssessmentValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};

const samplePatient: AssessmentValues = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

const normalizeValues = (values: AssessmentValues) => ({
  ...values,
  dateOfBirth: values.dateOfBirth || '',
  assessmentDate: values.assessmentDate || '',
  followUpDate: values.followUpDate || '',
  mobility: values.mobility || '',
  barthelIndex: values.barthelIndex === '' ? Number.NaN : Number(values.barthelIndex),
  medicationCount: values.medicationCount === '' ? Number.NaN : Number(values.medicationCount),
});

export function AssessmentForm() {
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useForm<AssessmentValues>({
    mode: 'uncontrolled',
    initialValues,
    validateInputOnBlur: true,
    validate: (values) => {
      const result = assessmentSchema.safeParse(normalizeValues(values));

      if (result.success) {
        return {};
      }

      return Object.fromEntries(
        result.error.issues.map((issue) => [String(issue.path[0]), issue.message])
      );
    },
  });

  const handleSubmit = async (values: AssessmentValues) => {
    setSaving(true);
    setSavedAssessment(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      //   const result = assessmentSchema.safeParse({
      //     ...values,
      //     barthelIndex: Number(values.barthelIndex),
      //     medicationCount: Number(values.medicationCount),
      //     dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : '',
      //     assessmentDate: values.assessmentDate
      //       ? dayjs(values.assessmentDate).format('YYYY-MM-DD')
      //       : '',
      //     followUpDate: values.followUpDate ? dayjs(values.followUpDate).format('YYYY-MM-DD') : '',
      //   });
      const result = assessmentSchema.safeParse(normalizeValues(values));

      if (!result.success) {
        form.setErrors(
          Object.fromEntries(
            result.error.issues.map((issue) => [String(issue.path[0]), issue.message])
          )
        );
        return;
      }

      setSavedAssessment(result.data);
      //   console.log('Saved assessment:', result.data);
    } finally {
      setSaving(false);
    }
  };

  const loadSample = () => {
    form.setValues(samplePatient);
    form.clearErrors();
    setSavedAssessment(null);
  };

  const mobilityOptions = MOBILITY.map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" radius="md" p="xl">
        <Stack gap="lg">
          <div>
            <Title order={2}>Geriatric Care Assessment</Title>
            <Text c="dimmed" size="sm" mt={4}>
              Complete all required patient assessment fields.
            </Text>
          </div>

          {savedAssessment && (
            <Alert color="green" title="Assessment saved successfully" role="status">
              <Text size="sm" mb="xs">
                Validated assessment data:
              </Text>
              <Code block>{JSON.stringify(savedAssessment, null, 2)}</Code>
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Medical Record Number (MRN)"
                placeholder="MRN-004821"
                withAsterisk
                key={form.key('mrn')}
                {...form.getInputProps('mrn')}
              />

              <TextInput
                label="Patient Name"
                withAsterisk
                key={form.key('patientName')}
                {...form.getInputProps('patientName')}
              />

              <DateInput
                label="Date of Birth"
                placeholder="Select date of birth"
                valueFormat="YYYY-MM-DD"
                clearable
                withAsterisk
                key={form.key('dateOfBirth')}
                value={form.values.dateOfBirth}
                onChange={(value) => form.setFieldValue('dateOfBirth', value)}
                onBlur={() => form.validateField('dateOfBirth')}
                error={form.errors.dateOfBirth}
              />

              <DateInput
                label="Assessment Date"
                placeholder="Select assessment date"
                valueFormat="YYYY-MM-DD"
                maxDate={new Date()}
                clearable
                withAsterisk
                key={form.key('assessmentDate')}
                value={form.values.assessmentDate}
                onChange={(value) => form.setFieldValue('assessmentDate', value)}
                onBlur={() => form.validateField('assessmentDate')}
                error={form.errors.assessmentDate}
              />

              <Select
                label="Mobility Status"
                placeholder="Select mobility status"
                data={mobilityOptions}
                withAsterisk
                key={form.key('mobility')}
                {...form.getInputProps('mobility')}
              />

              <NumberInput
                label="Barthel Index"
                description="Score from 0 to 100, in steps of 5."
                placeholder="Enter score"
                min={0}
                max={100}
                step={5}
                allowDecimal={false}
                clampBehavior="none"
                withAsterisk
                key={form.key('barthelIndex')}
                {...form.getInputProps('barthelIndex')}
              />

              <NumberInput
                label="Number of Regular Medications"
                placeholder="Enter medication count"
                min={0}
                max={30}
                allowDecimal={false}
                withAsterisk
                key={form.key('medicationCount')}
                {...form.getInputProps('medicationCount')}
              />

              <Checkbox
                label="Pharmacist review requested"
                key={form.key('pharmacistReviewRequested')}
                {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
              />

              <DateInput
                label="Next Review Date"
                placeholder="Select next review date"
                valueFormat="YYYY-MM-DD"
                clearable
                withAsterisk
                key={form.key('followUpDate')}
                value={form.values.followUpDate}
                onChange={(value) => form.setFieldValue('followUpDate', value)}
                onBlur={() => form.validateField('followUpDate')}
                error={form.errors.followUpDate}
              />

              <Checkbox
                label="Patient or representative has given consent"
                key={form.key('consentObtained')}
                {...form.getInputProps('consentObtained', {
                  type: 'checkbox',
                })}
              />

              <Group justify="space-between" mt="md">
                <Button type="button" variant="default" onClick={loadSample}>
                  Load sample patient
                </Button>

                <Button type="submit" loading={saving}>
                  Save assessment
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}
