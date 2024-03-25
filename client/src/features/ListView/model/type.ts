import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  Block,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';

import '@blocknote/react/style.css';
import { Mention } from '../../NewPost/ui/Mention';

export const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

export type MyBlock = Block<
  typeof schema.blockSchema,
  typeof schema.inlineContentSchema,
  typeof schema.styleSchema
>;
