'use server';

import {revalidateTag} from 'next/cache';
import {REVALIDATE_TAG} from '@/utils/extend/library/fetch';

export async function revalidateTagOnServerAction(tag: keyof typeof REVALIDATE_TAG) {
  revalidateTag(tag);
}
