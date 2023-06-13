import { writable } from 'svelte/store';
import { Flow, UploadType, IdCardStep } from './types';

export const flow = writable<Flow>(Flow.Questionaire);
export const uploadType = writable<UploadType>(UploadType.ID_CARD)
export const idCardStep = writable<IdCardStep>(IdCardStep.FRONT)
