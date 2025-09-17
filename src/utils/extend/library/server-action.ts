'use server';

import {revalidatePath, revalidateTag} from 'next/cache';

export async function revalidateTagOnServerAction(tag: string) {
  revalidateTag(tag);
}

// https://docs.google.com/document/d/13lDDYK9_phJENJNSVGovS3JfqDDpJpw3mfw8nnLBpEQ/edit?usp=drivesdk
export async function revalidatePathOnServerAction(path: string) {
  revalidatePath(path);
}
