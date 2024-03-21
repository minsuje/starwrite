import { createReactInlineContentSpec } from '@blocknote/react';

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: 'mention',
    propSchema: {
      title: {
        default: 'Unknown',
      },
      postid: {
        default: 'Unknown',
      },
    },
    content: 'none',
  },
  {
    render: (props) => (
      <>
        <a
          className="backlinking"
          style={{ color: 'white' }}
          href={`/user/starwrite/listview/main/전체/${props.inlineContent.props.postid}`}
        >
          @{props.inlineContent.props.title}
        </a>
      </>
    ),
  },
);
