/**
 * Personality Number Interpretations
 * Complete interpretations for how others perceive you based on Personality Number
 */

import { NumberSection } from '@/components/numbers/NumberDetailScreen';

export const PERSONALITY_SECTIONS: Record<number, NumberSection[]> = {
  1: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project confidence, leadership, and originality. Others see you as someone who takes charge and is not afraid to stand out from the crowd. People notice your strong presence and natural authority when you enter a room.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As a natural leader and pioneer\n+Confident and self-assured\n+Independent and original\n+Someone who gets things done\n+Bold and willing to take risks\n+A person with strong convictions\n+Someone who inspires action in others',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of a trailblazer and innovator. People expect you to have new ideas and to lead the way in whatever field you enter. You are seen as someone who can handle responsibility and make difficult decisions.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  2: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project gentleness, cooperation, and diplomatic grace. Others see you as approachable, supportive, and someone who values harmony and peaceful relationships. Your warm, caring nature draws people to you.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As a peacemaker and mediator\n+Gentle and considerate\n+A good listener and supporter\n+Someone who values relationships\n+Diplomatic and tactful\n+Cooperative and team-oriented\n+Emotionally sensitive and caring',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the perfect partner or team member. People see you as someone they can trust with their feelings and who will work harmoniously with others. You are viewed as the person who brings people together.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  3: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project creativity, enthusiasm, and natural charisma. Others see you as entertaining, optimistic, and full of life. Your expressive nature and communication skills make you the center of attention in social situations.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As creative and artistic\n+Entertaining and fun to be around\n+Optimistic and upbeat\n+An excellent communicator\n+Socially confident and outgoing\n+Someone who brings joy to others\n+Expressive and emotionally open',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of the entertainer and creative communicator. People expect you to be uplifting, inspiring, and to bring lightness to serious situations. You are seen as someone who can motivate and energize groups.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  4: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project stability, reliability, and methodical competence. Others see you as organized, practical, and someone they can depend on to get things done properly and on time.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As reliable and dependable\n+Organized and systematic\n+Practical and down-to-earth\n+A hard worker and dedicated\n+Someone with strong values\n+Methodical and thorough\n+A person who builds lasting foundations',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the solid, trustworthy professional. People see you as someone who will handle responsibilities seriously and deliver consistent, high-quality results. You are viewed as a stabilizing force.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  5: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project adventure, freedom, and dynamic energy. Others see you as exciting, versatile, and someone who brings stories and experiences from diverse places and situations.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As adventurous and exciting\n+Free-spirited and independent\n+Versatile and adaptable\n+Someone with interesting experiences\n+Curious and open to new ideas\n+Energetic and dynamic\n+A person who embraces change',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of the adventurous explorer and dynamic communicator. People expect you to have interesting stories, be open to new experiences, and bring fresh perspectives to any situation.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  6: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project warmth, nurturing care, and responsible service. Others see you as someone who genuinely cares about their well-being and who can be trusted to help and support them.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As caring and nurturing\n+Responsible and trustworthy\n+Someone who helps and heals others\n+Family-oriented and protective\n+A person with good judgment\n+Compassionate and understanding\n+Someone who creates harmony and beauty',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the caring healer and responsible caretaker. People see you as someone they can turn to for guidance, comfort, and practical help in times of need.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  7: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project mystery, intelligence, and spiritual depth. Others see you as someone who thinks deeply, has unique insights, and prefers quality conversations over small talk.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As mysterious and intriguing\n+Intelligent and analytical\n+Spiritual or philosophically minded\n+Someone who values privacy\n+Deep thinking and insightful\n+A person with unique perspectives\n+Reserved but wise',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of the wise sage or mysterious intellectual. People expect you to have profound insights, prefer meaningful conversations, and offer unique perspectives on complex matters.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  8: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project success, authority, and material competence. Others see you as someone who has achieved or will achieve significant accomplishments in the material world.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As successful and accomplished\n+Authoritative and powerful\n+Business-minded and practical\n+Someone who handles money well\n+A natural executive or leader\n+Ambitious and goal-oriented\n+A person who gets results',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the successful executive or material master. People see you as someone who can handle large responsibilities, make important financial decisions, and achieve ambitious goals.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  9: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project wisdom, compassion, and humanitarian concern. Others see you as someone who cares about the bigger picture and has a genuine interest in helping humanity as a whole.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As wise and compassionate\n+Humanitarian and globally minded\n+Someone who serves others selflessly\n+Artistic or creatively gifted\n+A person with broad understanding\n+Generous and giving\n+Someone who inspires others to serve',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of the humanitarian and universal server. People expect you to be involved in causes that help others and to have a mature, wise perspective on world issues.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  11: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project inspiration, intuitive wisdom, and spiritual magnetism. Others see you as someone with special gifts and the ability to uplift and inspire them toward higher purposes.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As inspirational and uplifting\n+Intuitive and psychically gifted\n+Someone with spiritual wisdom\n+A natural teacher or guide\n+Charismatic and magnetic\n+A person who channels higher truths\n+Someone who helps others awaken',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the inspirational teacher or spiritual guide. People see you as someone who can help them connect with higher truths and discover their own spiritual potential.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  22: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project visionary leadership combined with practical competence. Others see you as someone who can dream big and also make those dreams into reality on a large scale.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As a visionary and master builder\n+Someone who thinks on a large scale\n+Practical yet idealistic\n+A natural organizer of big projects\n+Someone who serves humanity\n+A person with exceptional capabilities\n+Someone who manifests grand visions',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public persona is that of the master builder and visionary leader. People expect you to be involved in large-scale projects that benefit humanity and to have the ability to turn ambitious dreams into reality.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  33: [
    {
      id: 'first-impressions',
      title: 'First Impressions',
      content: 'You project unconditional love, spiritual wisdom, and healing presence. Others see you as someone who embodies the highest ideals of service and compassion.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'how-others-see-you',
      title: 'How Others See You',
      content: '+As embodying unconditional love\n+A natural healer and teacher\n+Someone who serves others selflessly\n+Wise and spiritually mature\n+A person who brings out the best in others\n+Someone with exceptional compassion\n+A living example of spiritual principles',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'public-image',
      title: 'Public Image',
      content: 'Your public image is that of the universal teacher and healer. People see you as someone who has transcended personal desires to serve the highest good and who embodies the qualities they aspire to develop.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ]
};

export const PERSONALITY_TITLES: Record<number, string> = {
  1: 'The Confident Leader',
  2: 'The Gentle Diplomat',
  3: 'The Charismatic Entertainer',
  4: 'The Reliable Professional',
  5: 'The Dynamic Adventurer',
  6: 'The Caring Nurturer',
  7: 'The Mysterious Intellectual',
  8: 'The Successful Executive',
  9: 'The Compassionate Humanitarian',
  11: 'The Inspiring Visionary',
  22: 'The Practical Visionary',
  33: 'The Universal Healer',
};

export const getPersonalitySections = (number: number): NumberSection[] => {
  return PERSONALITY_SECTIONS[number] || PERSONALITY_SECTIONS[1];
};

export const getPersonalityTitle = (number: number): string => {
  return PERSONALITY_TITLES[number] || 'The Confident Leader';
};