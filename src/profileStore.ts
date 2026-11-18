import {migrateProfile,parseProfile,PROFILE} from './mineProfile.ts';
import {SAVE,type Store} from './save.ts';
import {decode} from './terrain.ts';
// Legacy key remains a frozen migration source. Profile owns subsequent original-mine saves.
export function profileStore(store:Store):Store{
 const source=store.getItem(SAVE);migrateProfile(store);let baseline=store.getItem(PROFILE)!;
 return {getItem(key){if(key!==SAVE)return store.getItem(key);const raw=store.getItem(PROFILE);if(raw!==baseline)return 'profile-conflict';return parseProfile(raw!).legacy},
 setItem(key,value){if(key!==SAVE)throw Error('Unexpected key');if(store.getItem(SAVE)!==source||store.getItem(PROFILE)!==baseline)throw Error('Profile conflict');const p=parseProfile(baseline),data=decode(value);const next={...p,legacy:value,mines:[Array.from(data.keys()).filter(i=>data[i]===0),...p.mines.slice(1)]};const raw=JSON.stringify(next);parseProfile(raw);store.setItem(PROFILE,raw);baseline=raw}};
}
