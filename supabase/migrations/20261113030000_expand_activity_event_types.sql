-- Expand activity_events_type_check constraint to permit both standard event names and legacy hyphenated client event types
ALTER TABLE public.activity_events DROP CONSTRAINT IF EXISTS activity_events_type_check;

ALTER TABLE public.activity_events ADD CONSTRAINT activity_events_type_check CHECK (
  event_type IN (
    -- Standard normalized event types
    'topic_viewed',
    'learning_mode_started',
    'learning_session_completed',
    'topic_bookmarked',
    'assessment_attempted',
    'resource_generated',
    'resource_saved',
    'resource_deleted',
    -- Legacy client event types
    'topic-opened',
    'path-changed',
    'discovery-session',
    'feynman-explanation',
    'feynman-assessed',
    'media-generated'
  )
);
