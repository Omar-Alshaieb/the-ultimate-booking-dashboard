import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
};

export const createUpdateCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //* A) Create/Update cabin
  let query = supabase.from('cabins');

  //* A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //* A) UPDATE
  else query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabins image could not be uploaded and the cabin was not created'
    );
  }

  return data;
};

export const deleteCabin = async id => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
};
