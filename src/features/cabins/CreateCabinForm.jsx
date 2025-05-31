import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
  const { id: updateId, ...editValue } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? editValue : {}
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const onSubmit = data => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isUpdateSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: updateId },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          }
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: data => {
            reset();
            onCloseModal?.();
          }
        }
      );
  };

  const isWorkin = isCreating || isUpdating;
  const onError = errors => {
    // console.log(errors);
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorkin}
          {...register('name', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorkin}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          disabled={isWorkin}
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          disabled={isWorkin}
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price'
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}>
        <Textarea
          type='number'
          disabled={isWorkin}
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={null}>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          disabled={isWorkin}
          {...register('image', {
            required: isUpdateSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorkin}>
          {isUpdateSession ? 'Update Cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
