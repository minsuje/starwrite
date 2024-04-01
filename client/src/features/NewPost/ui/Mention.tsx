import { createReactInlineContentSpec } from '@blocknote/react';

// const myNickname = localStorage.getItem('nickname');

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
      nickname: {
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
          style={{ color: 'white', backgroundColor: 'var(--color-zinc-700)' }}
          href={`/user/starwrite/listview/main/${props.inlineContent.props.nickname}/all/${props.inlineContent.props.postid}`}
        >
          @{props.inlineContent.props.title}
        </a>
      </>
    ),
  },
);
