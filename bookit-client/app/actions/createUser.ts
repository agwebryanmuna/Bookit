'use server';
import { createAdminClient } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';

interface SessionResponse {
  success: boolean;
  error: string;
}


async function createUser(previousState:SessionResponse, formData:FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  if (!email || !name || !password) {
    return {
      error: 'Please fill in all fields',
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match',
      success: false,
    };
  }

  // Get account instance
  const { account } = await createAdminClient();

  try {
    // Create user
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
      error: '',
    };
  } catch (error) {
    console.log('Registration Error: ', error);
    return {
      error: 'Could not register user',
      success: false,
    };
  }
}

export default createUser;
