using com.media as media from '../db/schema';

service MediaService {
  entity MediaFile as projection on media.MediaFile;
}
