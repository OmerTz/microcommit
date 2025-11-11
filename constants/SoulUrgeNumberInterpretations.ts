/**
 * Soul Urge Number Interpretations
 * Extracted from SoulUrgeNumberScreen for Bible.md compliance (under 400 lines)
 */

import { NumberSection } from '@/components/numbers/NumberDetailScreen';

export const SOUL_URGE_SECTIONS: Record<number, NumberSection[]> = {
  1: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul craves independence, leadership, and the freedom to pursue your own unique path. You have an inner drive to be first, to innovate, and to lead others. Deep within, you yearn to be recognized as a pioneer and original thinker.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To be independent and self-reliant\n+To lead and inspire others\n+To create something original and meaningful\n+To be recognized for unique achievements\n+To have the freedom to make own decisions\n+To break new ground in chosen field\n+To overcome challenges through personal strength',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'You find spiritual satisfaction when you are pioneering new paths and helping others discover their own independence. Your soul seeks to express divine creativity through original ideas and leadership that serves the greater good.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  2: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul yearns for harmony, partnership, and peaceful cooperation with others. You have a deep inner need to create balance and serve as a bridge between people, situations, or ideas that seem in conflict.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To create harmony and peace in all situations\n+To work in partnership with others\n+To be appreciated for diplomatic skills\n+To help others resolve conflicts\n+To feel emotionally connected and understood\n+To contribute to group efforts and team success\n+To create beauty and balance in environment',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds peace when serving as a mediator and peacemaker. You achieve spiritual satisfaction through cooperative efforts that bring people together and create harmony where there was discord.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  3: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul craves creative expression, joyful communication, and the opportunity to inspire others through your artistic gifts. You have a deep need to share your inner light and bring happiness to the world.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To express creativity through multiple mediums\n+To communicate ideas in inspiring ways\n+To bring joy and laughter to others\n+To be recognized for artistic talents\n+To live life with optimism and enthusiasm\n+To inspire others to pursue their dreams\n+To create beauty that touches hearts and minds',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'You find spiritual joy when your creative expressions uplift others and bring light to their lives. Your soul seeks to be a channel for divine creativity, spreading optimism and inspiration wherever you go.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  4: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul seeks security, order, and the satisfaction of building something lasting and meaningful. You have a deep need to create stable foundations and contribute to structures that will benefit future generations.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To build secure and lasting foundations\n+To create order from chaos\n+To work systematically toward goals\n+To be valued for reliability and dependability\n+To contribute to family and community stability\n+To see practical results from efforts\n+To leave a legacy of solid achievement',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds peace in creating order and building systems that serve others. You achieve spiritual satisfaction through methodical work that creates lasting value and stability for yourself and others.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  5: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul yearns for freedom, adventure, and constant variety in life experiences. You have a deep need to explore, learn, and experience all that life has to offer without being tied down by restrictions.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To experience freedom in all forms\n+To travel and explore new places\n+To learn about different cultures and ideas\n+To avoid routine and boring repetition\n+To meet diverse and interesting people\n+To satisfy curiosity about everything\n+To live life as an exciting adventure',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'You find spiritual satisfaction in experiencing the full spectrum of human experience. Your soul seeks growth through variety, change, and the expansion of consciousness that comes from exploring new horizons.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  6: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul craves the opportunity to nurture, heal, and serve others in meaningful ways. You have a deep need to create beautiful, harmonious environments where people can grow and thrive.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To care for and nurture others\n+To create beautiful and harmonious spaces\n+To heal emotional and physical wounds\n+To teach and guide those seeking growth\n+To be needed and appreciated for caring nature\n+To contribute to community well-being\n+To protect and support family and loved ones',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds deep satisfaction in service to others, especially in healing and nurturing capacities. You achieve spiritual fulfillment through acts of compassion that help others realize their highest potential.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  7: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul seeks truth, wisdom, and deep understanding of life mysteries. You have an inner need to explore both the spiritual and scientific aspects of existence, often preferring solitude for contemplation.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To understand the deeper meaning of life\n+To have time alone for contemplation\n+To research and analyze complex subjects\n+To develop intuitive and psychic abilities\n+To connect with spiritual or universal truths\n+To be respected for wisdom and insight\n+To help others find their spiritual path',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'You find spiritual satisfaction in the pursuit of truth and wisdom. Your soul seeks to understand the mysteries of existence and share profound insights that help others on their spiritual journey.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  8: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul yearns for material success, recognition of achievements, and the power to create positive change in the world. You have a deep need to build something substantial that leaves a lasting impact.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To achieve significant material success\n+To be recognized as a leader in chosen field\n+To build organizations or systems that endure\n+To have financial security and abundance\n+To use power and influence responsibly\n+To create opportunities for others\n+To leave a legacy of positive impact',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds satisfaction in using material success to benefit others and create positive change. You achieve spiritual fulfillment when your achievements serve the greater good and help elevate humanity.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  9: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul craves the opportunity to serve humanity on a grand scale. You have a deep need to contribute to causes greater than yourself and help create a more compassionate world for all.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To serve humanity and universal causes\n+To help heal the wounds of the world\n+To express wisdom and compassion\n+To inspire others toward their highest potential\n+To create art or work that touches many lives\n+To be remembered for contributions to humanity\n+To experience unconditional love and acceptance',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'You find deep spiritual satisfaction in selfless service to humanity. Your soul seeks to embody universal love and wisdom, serving as an example of compassion and humanitarian values.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  11: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul yearns to serve as a spiritual messenger and source of inspiration for others. You have a deep need to channel higher wisdom and help others awaken to their spiritual potential.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To inspire and uplift others spiritually\n+To channel higher wisdom and intuitive insights\n+To help others discover their spiritual gifts\n+To live as an example of spiritual principles\n+To bridge the gap between spiritual and material worlds\n+To teach or guide others on spiritual paths\n+To be a beacon of light in times of darkness',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds fulfillment in serving as a channel for divine wisdom and inspiration. You achieve spiritual satisfaction when your gifts help others awaken to their higher purpose and spiritual potential.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  22: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul yearns to manifest grand visions that benefit humanity on a large scale. You have a deep need to combine spiritual wisdom with practical action to create lasting positive change in the world.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To manifest large-scale positive change\n+To build systems that serve humanity\n+To combine spiritual vision with practical action\n+To leave a lasting legacy of service\n+To inspire others to work for the greater good\n+To use all abilities in service of universal principles\n+To help humanity evolve to higher consciousness',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds deep satisfaction in manifesting spiritual ideals in practical, tangible ways. You achieve fulfillment when your grand visions become reality and create lasting benefit for humanity.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ],
  33: [
    {
      id: 'soul-desires',
      title: 'Soul Desires',
      content: 'Your soul craves the opportunity to embody and teach unconditional love. You have a deep need to heal and nurture others through your example of selfless service and spiritual compassion.',
      icon: '■',
      type: 'traits',
      level: 1,
    },
    {
      id: 'inner-motivations',
      title: 'Inner Motivations',
      content: '+To embody unconditional love and compassion\n+To heal others through spiritual service\n+To teach by example rather than words\n+To sacrifice personal desires for the greater good\n+To help others discover their divine nature\n+To serve as a spiritual parent to humanity\n+To create healing and transformation wherever you go',
      icon: '○',
      type: 'traits',
      level: 1,
    },
    {
      id: 'spiritual-fulfillment',
      title: 'Spiritual Fulfillment',
      content: 'Your soul finds ultimate fulfillment in selfless service and the expression of divine love. You achieve spiritual satisfaction when your presence alone brings healing and transformation to others.',
      icon: '◈',
      type: 'practical',
      level: 2,
    },
  ]
};

export const SOUL_URGE_TITLES: Record<number, string> = {
  1: 'The Independent Pioneer',
  2: 'The Peaceful Harmonizer',
  3: 'The Creative Expressionist',
  4: 'The Security Seeker',
  5: 'The Freedom Lover',
  6: 'The Loving Caregiver',
  7: 'The Truth Seeker',
  8: 'The Success Achiever',
  9: 'The Universal Server',
  11: 'The Spiritual Messenger',
  22: 'The Master Manifester',
  33: 'The Universal Teacher',
};

export const getSoulUrgeSections = (number: number): NumberSection[] => {
  return SOUL_URGE_SECTIONS[number] || SOUL_URGE_SECTIONS[1];
};

export const getSoulUrgeTitle = (number: number): string => {
  return SOUL_URGE_TITLES[number] || 'The Independent Pioneer';
};