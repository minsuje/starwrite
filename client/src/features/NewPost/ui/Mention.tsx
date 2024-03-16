import { createReactInlineContentSpec } from '@blocknote/react';

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: 'mention',
    propSchema: {
      user: {
        default: 'Unknown',
      },
    },
    content: 'none',
  },
  {
    render: (props) => (
      //   <span style={{ backgroundColor: '#5f5615e0' }}>
      //     @{props.inlineContent.props.user}
      //   </span>

      <a href="http://localhost:5173/user/starwrite/listview/main/전체/1">
        @{props.inlineContent.props.user}
      </a>
    ),
  },
);
