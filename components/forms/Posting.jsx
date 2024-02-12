import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Posting = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });
  const router = useRouter();
  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();
      postForm.append('creatorId', data.creatorId);
      postForm.append('caption', data.caption);
      postForm.append('tag', data.tag);

      if (typeof data.postPhoto !== 'string') {
        postForm.append('postPhoto', data.postPhoto[0]);
      } else {
        postForm.append('postPhoto', data.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: postForm,
      });

      if (response.ok) {
        router.push(`/profile/${data.creatorId}/posts`);
        return;
      }
    } catch (error) {
      console.log('Creating post failed', error.message);
    }
  };

  return (
    <form
      className='flex flex-col gap-7 pb-24'
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor='photo'
        className='flex gap-4 items-center text-light-1 cursor-pointer'
      >
        {watch('postPhoto') ? (
          typeof watch('postPhoto') === 'string' ? (
            <Image
              src={watch('postPhoto')}
              alt='post'
              width={250}
              height={250}
              className='object-cover rounded-lg'
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch('postPhoto')[0])}
              alt='post'
              width={250}
              height={200}
              className='object-cover rounded-lg'
            />
          )
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: '100px', color: 'green' }}
          />
        )}
        <p>Upload a photo</p>
      </label>
      <input
        {...register('postPhoto', {
          validate: (value) => {
            if (
              typeof value === 'null' ||
              (Array.isArray(value) && value.length === 0) ||
              typeof value === 'undefined'
            ) {
              return 'A Photo is required';
            }
            return true;
          },
        })}
        id='photo'
        type='file'
        style={{ display: 'none' }}
      />
      {errors.postPhoto && (
        <p className='text-red-500'>{errors.postPhoto.message}</p>
      )}
      <div>
        <label
          htmlFor=''
          className='text-light-1'
        >
          Caption
        </label>
        <textarea
          {...register('caption', {
            required: 'Caption is required',
            validate: (value) => {
              if (value.length < 3) {
                return 'Caption must be more than 2 characters';
              }
            },
          })}
          type='text'
          rows={3}
          placeholder='What is on your mind?'
          className='w-full input'
          id='caption'
        />
        {errors.caption && (
          <p className='text-red-500'>{errors.caption.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor=''
          className='text-light-1'
        >
          Tags
        </label>
        <input
          {...register('tag', {
            required: 'Tag is required',
          })}
          type='text'
          placeholder='#tag'
          className='w-full input'
        />
        {errors.tag && <p className='text-red-500'>{errors.tag.message}</p>}
      </div>
      <button
        type='submit'
        className='py-2.5 rounded-lg mt-10 bg-purple-1 hover:bg-pink-1 text-light-1'
      >
        Publish
      </button>
    </form>
  );
};

export default Posting;
