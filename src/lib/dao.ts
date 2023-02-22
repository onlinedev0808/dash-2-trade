import mysql, { OkPacket } from "mysql2";
import { ConformPasswordForm,
         ResetEmailForm, 
         ChangePasswordForm, 
         User, 
         UserCreateForm, 
         UserMFAForm, 
         VerifyCodeForm,
         VerifyEmailForm,
         Watchlist,
         Tag,
         MessageForm,
         Message,
         MessageRecipientForm,
         MessageLikeForm,
         MessageLike,
         MessageUpdateForm,
         MessageCreateForm,
         MessageCountForm, } from "../types/interfaces";

const connection = mysql.createConnection(process.env.DATABASE_URL);

export namespace DAO {
  export class UserDAO {
    /**
     * Registers a new user
     * @param {UserCreateForm} userCreateForm - user create request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async signUp(
      userCreateForm: UserCreateForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `INSERT INTO users (email, password, account_verified, watchlists, verification_code, accept_newsletter, enable_mfa, auth_key, policy, otpauth_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
             userCreateForm.email,
             userCreateForm.hash,
             userCreateForm.code,
             userCreateForm.agreedToReceiveNewsletters,
             userCreateForm.enable_mfa,
             userCreateForm.auth_key,
             userCreateForm.policyMFA,
             userCreateForm.otpauth_link,
            ]
          );
          return result.insertId
      } catch (err) {
        return false
      }
    }

    /**
     * Gets a user by their email
     * @param {string} email - User email address.
     * @return {<User | boolean>} returns user object if successful, otherwise returns false
     */
    public static async getUserDatabyEmail(email: string): Promise<User | boolean> {
      try {
        const [users] = await connection
          .promise()
          .query<OkPacket>(
            `SELECT * FROM users WHERE email = ?`,
            [email]
          );

        if (Array.isArray(users) && !users.length) return false; //User not found

        const user: User = {
          ...users[0],
          account_verified: !!users[0].account_verified,
          subscription_status: !!users[0].subscription_status,
          accept_newsletter: !!users[0].accept_newsletter,
          enable_mfa: !!users[0].enable_mfa,
        }

        return user;
      } catch (err) {
        return false;
      }
    }

    /**
     * Gets a user by their id
     * @param {number} id - The registration number of user in sql table.
     * @return {<User | boolean>} returns accounts object if successful, otherwise returns false
     */
    public static async getUserDatabyId(id: number): Promise<User | boolean> {

      try {
        const [users] = await connection
          .promise()
          .query<OkPacket>(
            `SELECT * FROM users WHERE id = ?`,
            [id]
          );
          const accounts: User = {
            ...users[0],
            account_verified: !!users[0].account_verified,
            subscription_status: !!users[0].subscription_status,
            accept_newsletter: !!users[0].accept_newsletter,
            enable_mfa: !!users[0].enable_mfa,
          }

          return accounts;
      } catch (err) {
        return false;
      }

    }

    /**
     * Update a users MFA info
     * @param {UserMFAForm} userMFAForm - UserMFA update request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async updateUserMFA(
      userMFAForm: UserMFAForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET enable_mfa = ?, auth_key = ?, policy = ?, otpauth_link = ? WHERE id = ?;`,
            [
             userMFAForm.enable_mfa,
             userMFAForm.auth_key,
             userMFAForm.policyMFA,
             userMFAForm.otpauth_link,
             userMFAForm.id,
            ]
          );

        return result.insertId
      } catch (err) {
        return false;
      }    
    }

    /**
     * Update a users password
     * @param {ChangePasswordForm} changePasswordForm - userPassword change request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async changeUserPassWord(
      changePasswordForm: ChangePasswordForm
    ): Promise<number| boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET temp_password = ?, verification_code = ?, token_expires = ?, temp_policy = ?, temp_authkey = ? WHERE id = ?;`,
            [
              changePasswordForm.bcrypt,
              changePasswordForm.token,
              changePasswordForm.time,
              changePasswordForm.policyMFA,
              changePasswordForm.auth_key,
              changePasswordForm.id,
            ]
          );

          return result.insertId
        } catch (err) {
          return false;
        }
      }

    /**
     * Reset a users password
     * @param {ConformPasswordForm} conformPasswordForm - changePassWord conform request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async conformChangePassWord(
      conformPasswordForm: ConformPasswordForm
    ): Promise<number| boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET password = ?, policy = ?, verification_code = ?, auth_key = ?, temp_policy = ?, temp_password = ?, temp_authkey = ? WHERE id = ?;`,
            [
              conformPasswordForm.password,
              conformPasswordForm.policyMFA,
              conformPasswordForm.code,
              conformPasswordForm.auth_key,
              conformPasswordForm.temp_policy,
              conformPasswordForm.temp_password,
              conformPasswordForm.temp_authkey,
              conformPasswordForm.id,
            ]
          );

          return result.insertId
        } catch (error) {
          return false;
        }
    }

    /**
     * Reset a users email
     * @param {RestEmailForm} resetEmailForm - userEmail reset request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */   
    public static async resetEmail(
      resetEmailForm: ResetEmailForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET email = ?, temp_email = ?, reset_email_token = ? WHERE id = ?;`,
            [
              resetEmailForm.email,
              resetEmailForm.temp_email,
              resetEmailForm.reset_email_token,
              resetEmailForm.id,
            ]
          );
          return result.insertId
        } catch (error) {
          return false;
        }
    }

    /**
     * Verify a users email
     * @param {VerifyEmailForm} verifyEmailForm - email verify request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async verifyEmail(
      verifyEmailForm: VerifyEmailForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET email = ?, temp_email = ?, reset_email_token = ?, reset_token_expires = ?, verification_code = ? WHERE id = ?;`,
            [
              verifyEmailForm.temp_email,
              verifyEmailForm.email,
              verifyEmailForm.token,
              verifyEmailForm.time,
              verifyEmailForm.code,
              verifyEmailForm.id,
            ]
          );

          return result.insertId
        } catch (error) {
          return false;
        }
    }

    /**
     * Get a user by their verification code
     * @param {string} code - The code for user verification.
     * @return {<User | boolean>} returns accounts object if successful, otherwire returns false
     */
    public static async getUserByVerifyCode(code: string): Promise<User | boolean> {
      try {
        const [users] = await connection
          .promise()
          .query(
            `SELECT * FROM users WHERE verification_code = ?`,
            [code]
          );
        
          const accounts: User = {
            ...users[0],
            account_verified: !!users[0].account_verified,
            subscription_status: !!users[0].subscription_status,
            accept_newsletter: !!users[0].accept_newsletter,
            enable_mfa: !!users[0].enable_mfa,
          }

          return accounts;
      } catch (err) {
        return false;
      }
    }

    /**
     * Update a users verification code
     * @param {VerifyCodeForm} verifyCodeForm - verifyCode update request form
     * @return {<number  | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async updateVerifyCode(
      verifyCodeForm: VerifyCodeForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET account_verified = ?, verification_code = ? WHERE id = ?;`,
            [
              verifyCodeForm.account_verified,
              verifyCodeForm.code,
              verifyCodeForm.id,
            ]
          );

          return result.insertId
        } catch (error) {
          return false;
        }
    }

    /**
     * Get a users id from their email
     * @param {string} email - The user email address.
     * @return {<number | boolean>} returns users id if successful, otherwise returns false
     */
    public static async getIDbyEmail(email: string): Promise<number | boolean> {
      try {
        const [accounts] = await connection
          .promise()
          .query<OkPacket>(
            `SELECT id FROM users WHERE email =  = ?`,
            [email]
          );

        return accounts[0].id;
      } catch (error) {
        return false;
      }
    }

    /**
     * Get a users id from their nickname
     * @param {string} nickname - The user nickname.
     * @return {<User | boolean>} returns accounts object if successful, otherwise returns false
     */
    public static async getByNickName(nickname: string): Promise<User | boolean> {
      try {
        const [users] = await connection
          .promise()
          .query<OkPacket>(
            `SELECT * FROM users WHERE nickname = ?`,
            [nickname]
          );
        
          const account: User = {
            ...users[0],
            account_verified: !!users[0].account_verified,
            subscription_status: !!users[0].subscription_status,
            accept_newsletter: !!users[0].accept_newsletter,
            enable_mfa: !!users[0].enable_mfa,
          }

        return account;
      } catch (error) {
        return false;
      }
    }

    /**
     * Update a watchlists items
     * @param {Watchlist[]} watchlists - The group token that you used.
     * @param {number} id - The id of watchlists
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async updateWatchlists(watchlists: Watchlist[], id: number): Promise<number | boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `UPDATE users SET watchlists = ? WHERE id = ?;`,
            [watchlists, id]
          );

        return result.insertId
      } catch (err) {
        return false;
      }
    }
  }

  export class TagDAO {
    /**
     * Get all tags
     * @return {Tag[] | boolean} returns tag object if successful, otherwise return false
     */
    public static async getAllTags(): Promise<Tag[] | boolean>{
      try {
        const [tags] = await connection
          .promise()
          .query(
            `SELECT * FROM tag`, (err, results) => {
            if (err) {
              throw err;
            }
          });

          return tags as Tag[]
      } catch (error) {
        return false;
      }
    }
  }

  export class MessaageLikeDAO {
    /**
     * Gets data from the given table by its id
     * @param {MessageLikeForm} messageLikeForm - getDataById request form
     * @return {<MessageLike | boolean>} returns event object if successful, otherwise returns sucessful.
     */
        public static async getDataById(
          messageLikeForm: MessageLikeForm
        ): Promise<MessageLike | boolean> {
          try {
            const [message_likes] = await connection
              .promise()
              .query<OkPacket>(
                `SELECT * FROM ${messageLikeForm.table} WHERE item_id = ? AND user_id = ?`,
                [
                  messageLikeForm.item_id,
                  messageLikeForm.user_id,
                ]
              );
            
              const messagelike: MessageLike = {
                ...message_likes[0],
                is_like: !!message_likes[0].is_like
              }
    
            return messagelike;
          } catch (error) {
            return false;
          }
        }
    
    /**
     * Update data within the given table
     * @param {MessageUpdateForm} messageUpdateForm - updateData request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false 
     */
    public static async updateData(
      messageUpdateForm: MessageUpdateForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
        .promise()
        .query<OkPacket>(
          `UPDATE ${messageUpdateForm.table} SET is_like = ${!messageUpdateForm.is_like}
                      WHERE item_id = ? AND user_id = ?`,
          [
            messageUpdateForm.item_id, 
            messageUpdateForm.user_id,
          ]
        );

        return result.insertId;
      } catch (error) {
        return false;
      }
    }

    /**
     * Add data to the given table
     * @param {MessageCreateForm} messageCreateForm - createData request form
     * @return {<number | boolean>} returns inserId if successful, otherwise returns false
     */
    public static async createData(
      messageCreateForm: MessageCreateForm
    ): Promise<number| boolean> {
      try {
        const [result] = await connection
          .promise()
          .query<OkPacket>(
            `INSERT INTO ${messageCreateForm.table} (item_id, user_id, is_like) VALUES (?, ?, 1)`,
            [
              messageCreateForm.item_id,
              messageCreateForm.user_id,
            ]
          );

        return result.insertId;
      } catch (error) {
        return false;
      }
    }

    /**
     * Get the total length of the data in the given table
     * @param {MessageCountForm} messageCountForm - countData request form
     * @return {<MessageLike | boolean>} returns message object if successful, otherwise returns false
     */
    public static async countData(
      messageCountForm: MessageCountForm
    ): Promise<MessageLike | boolean> {
      try {
        const [message_likes] = await connection
          .promise()
          .query<OkPacket>(
            `SELECT COUNT(*) as num FROM ${messageCountForm.table} WHERE item_id = ? AND is_like=1 GROUP BY item_id`,
            [
              messageCountForm.item_id,
              messageCountForm.user_id,
            ]
          );
        
        const messagelike: MessageLike = {
          ...message_likes[0],
          is_like: !!message_likes[0].is_like
        }

        return messagelike;
      } catch (error) {
        return false;
      }
    }
  }

  export class MessageDAO {
    /**
     * Get a message by its id
     * @param {MessageForm} messagesForm - getMessageById request form
     * @return {<Message | boolean>} - returns message object if successful, otherwise returns false
     */
    public static async getMessageById(messagesForm : MessageForm): Promise<Message | boolean> {
      try {
        const [messages] = await connection
        .promise()
        .query<OkPacket>(
          `SELECT *, (SELECT GROUP_CONCAT(DISTINCT t.title SEPARATOR ';') FROM tag_item AS i INNER JOIN tag AS t ON t.id=i.tag_id where item_id=m.id) AS tags, r.is_read as is_read
                      FROM messages AS m 
                      INNER JOIN message_recipient AS r ON m.id = r.message_id
                      WHERE m.type_id= ? AND r.user_id = ?
                      ORDER BY m.id DESC LIMIT 5;`,
          [
            messagesForm.type_id,
            messagesForm.user_id,
          ]
        );

        const message: Message = {
          ...messages[0],
        }

        return message;
      } catch (error) {
        return false;
      }
    }

    /**
     * Update a message
     * @param {MessageForm} messagesForm - updateMessage request form, params same as getMessageById.
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async updateMessage(messagesForm : MessageForm): Promise<number | boolean> {
      try {
        const [result] = await connection
        .promise()
        .query<OkPacket>(
          `UPDATE message_recipient AS r
            INNER JOIN messages AS m ON m.id = r.message_id
            SET r.is_read = 1
            WHERE m.type_id = ? AND r.is_read = 0 AND r.user_id = ?`,
          [
            messagesForm.type_id,
            messagesForm.user_id,
          ]
        );

        return result.insertId
      } catch (error) {
        return false;
      }
    }

    /**
     * Update the read value of a message
     * @param {MessageRecipientForm} messageRecipientForm - Message_recipient update request form
     * @return {<number | boolean>} returns insertId if successful, otherwise returns false
     */
    public static async updateMessage_recipient(
      messageRecipientForm: MessageRecipientForm
    ): Promise<number | boolean> {
      try {
        const [result] = await connection
        .promise()
        .query<OkPacket>(
          `UPDATE message_recipient 
                      SET is_read = 1
                      WHERE message_id = ? AND user_id = ?`,
          [
            messageRecipientForm.message_id,
            messageRecipientForm.user_id,
          ]
        );

        return result.insertId
      } catch (error) {
        return false;
      }
    }
  }
}
