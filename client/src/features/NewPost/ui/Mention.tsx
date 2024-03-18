import { createReactInlineContentSpec } from '@blocknote/react';

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: 'mention',
    propSchema: {
      name: {
        default: 'Unknown',
      },
      id: {
        default: 'Unknown',
      },
    },
    content: 'none',
  },
  {
    render: (props) => (
      <a
        style={{ color: 'white' }}
        href={`http://localhost:5173/user/starwrite/listview/main/전체/${props.inlineContent.props.id}`}
      >
        @{props.inlineContent.props.name}
      </a>
    ),
  },
);
