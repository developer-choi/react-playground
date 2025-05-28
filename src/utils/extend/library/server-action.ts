'use server';

import {revalidatePath, revalidateTag} from 'next/cache';
import {RevalidateTagType} from '@/utils/extend/library/fetch';

export async function revalidateTagOnServerAction(tag: RevalidateTagType) {
  revalidateTag(tag);
}

// https://docs.google.com/document/d/13lDDYK9_phJENJNSVGovS3JfqDDpJpw3mfw8nnLBpEQ/edit?usp=drivesdk
export async function revalidatePathOnServerAction(path: string) {
  revalidatePath(path);
}
