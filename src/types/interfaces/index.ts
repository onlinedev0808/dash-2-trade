export interface IMFKDFFactors {
  password?: any;
  totp?: any;
}

export interface UserCreateForm {
  email: string;  // User email address.
  hash: string;  // Crypted user password by hash function.
  code: string;  // The code for verification.
  agreedToReceiveNewsletters: boolean;  // The status of receiving newsletters.
  enable_mfa: number;  // The status that enable of MFA.
  auth_key: string;  // The key of user authentication.
  policyMFA: any;  // The schema of MFA.
  otpauth_link: string;  // The author of the book.
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  account_verified: boolean;
  watchlists: Watchlist[];
  verification_code: string;
  subscription_status: boolean;
  subscription_tier: number;
  accept_newsletter: boolean;
  enable_mfa: boolean;
  auth_key: string;
  policy: string;
  otpauth_link: string;
  first_name: string;
  last_name: string;
  token_expires: number;
  reset_token_expires: number;
  reset_email_token: string;
  temp_email: string;
  temp_policy: string;
  temp_password: string;
  temp_authkey: string;
  profile_picture: string;
}

export interface Watchlist {
  id: string;
  name: string;
  Tokens: number[];
}

export interface UserMFAForm {
  enable_mfa: number;  // The status of enable MFA
  auth_key: string;  // The key of user authentication for MFA.
  policyMFA: any;  // The schema of MFA.
  otpauth_link: string;  // The link url for MFA.
  id: number;  // The registration number of user in sql table.
}

export interface ChangePasswordForm {
  bcrypt: string;  // The hashed password to store
  token: string;  // The users token
  time: string;  // The timestamp
  policyMFA: any;  // The schema of MFA.
  auth_key: string;  // The key of user authentication for MFA.
  id: number;  // The registration number of user in sql table.
}

export interface ConformPasswordForm {
  password: string;  // The password that you are going to reset
  policyMFA: any;  // The schema of MFA.
  code: string;  // The code for user verification.
  auth_key: string;  // The key of user authentication for MFA.
  temp_policy: string;  
  temp_password: string;
  temp_authkey: string;
  id: number  // The registration number of user in sql table.
}

export interface ResetEmailForm {
  email: string;  // The user email address
  temp_email: string;
  reset_email_token: string;  // The new token values for reset email.
  id: number;  // The registration number of user in sql table.
}

export interface VerifyEmailForm {
  temp_email: string;  // The user email address
  email: string;
  token: string;  // The token values for user authentication.
  time: string;  // The time for verification user email.
  code: string;  // The code for user authentication.
  id: number;  // The registration number of user in sql table.
}

export interface VerifyCodeForm {
  account_verified: boolean;  // The code for user verification.
  code: string;  // The code for user verification.
  id: number;  // The registration number of user in sql table.
}

export interface Event {
  id: number;
	title: string;
	description: string;   
	timestamp: number;
	image: string;
	tags: string;
}

export interface Tag {
  id: number;
	title: string;
	color: string;
	type: string;
}

export interface MessageLike {
  user_id: number;
  item_id: number;
  is_like: boolean;
}

export interface MessageCountForm {
  table: string;  // The name of table that stored message.
  item_id: number;  // The id of message
  user_id: number;  // The id of user
}

export interface MessageCreateForm {
  table: string;  // The name of table that stored message.
  item_id: number;  // The id of message
  user_id: number;  // The id of user
}

export interface MessageLikeForm extends MessageCreateForm, MessageCountForm {
  table: string;  // The name of table that stored message.
  item_id: number;  // The id of message
  user_id: number;  // The id of user
}

export interface MessageUpdateForm {
  table: string;  // The name of table that stored message.
  is_like: boolean;  // The one of property of message.
  item_id: number;  // The id of message
  user_id: number;  // The id of user
}
export interface Message {
  id: number;
	title: string;
	description: string;
	timestamp: number;
	type_id: number;
	image: string;
}

export interface MessageForm {
  type_id: number;  // The id of message
  user_id: number;  // The id of user
}

export interface MessageRecipientForm {
  message_id: number;  // The id of message
  user_id: number;  // The id of user
}