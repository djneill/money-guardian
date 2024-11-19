import React from 'react'
import { getLoggedInUser } from '../../../../actions/auth'
import SigninButton from './SigninButton';

export default async function SigninButtonWrapper() {
    const user = await getLoggedInUser();
    return <SigninButton user={user} />
}