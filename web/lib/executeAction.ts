import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
}
export const executeAction = async <T>({
  actionFn,
  successMessage = "The action was successful"
}: Options<T>): Promise<{ success: boolean; message: string}> => {
  try {
    await actionFn();
    return {
      success: true,
      message: successMessage,
  };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };    
  }
}