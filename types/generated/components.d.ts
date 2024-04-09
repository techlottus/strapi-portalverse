import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentRelationsConectContent extends Schema.Component {
  collectionName: 'components_content_relations_conect_contents';
  info: {
    displayName: 'conect content';
  };
  attributes: {
    relatedContent: Attribute.JSON &
      Attribute.CustomField<'plugin::fetch-content.api-select'>;
  };
}

export interface MiscSendWhatsapp extends Schema.Component {
  collectionName: 'components_misc_send_whatsapps';
  info: {
    displayName: 'send whatsapp';
  };
  attributes: {
    hidden: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    phone: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'5555555555'>;
  };
}

export interface MoleculesButton extends Schema.Component {
  collectionName: 'components_molecules_buttons';
  info: {
    displayName: 'Button';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    variant: Attribute.Enumeration<
      ['primary', 'outlined', 'outlined-negative']
    > &
      Attribute.DefaultTo<'primary'>;
    size: Attribute.Enumeration<['xs', 'sm', 'md', 'lg']>;
    iconName: Attribute.String;
    CTA: Attribute.String & Attribute.Required;
  };
}

export interface ProgramsCurriculumByCampus extends Schema.Component {
  collectionName: 'components_programs_curriculum_by_campuses';
  info: {
    displayName: 'CurriculumByCampus';
    description: '';
  };
  attributes: {
    campus: Attribute.Relation<
      'programs.curriculum-by-campus',
      'oneToOne',
      'api::campus.campus'
    >;
    curriculum: Attribute.Media;
  };
}

export interface ProgramsLevelPageConfig extends Schema.Component {
  collectionName: 'components_programs_level_page_configs';
  info: {
    displayName: 'LevelPageConfig';
  };
  attributes: {
    level: Attribute.Relation<
      'programs.level-page-config',
      'oneToOne',
      'api::level.level'
    >;
    slug: Attribute.String;
  };
}

export interface ProgramsModalityFeature extends Schema.Component {
  collectionName: 'components_programs_modality_features';
  info: {
    displayName: 'ModalityFeature';
    description: '';
  };
  attributes: {
    modality: Attribute.Relation<
      'programs.modality-feature',
      'oneToOne',
      'api::modality.modality'
    >;
    labelModality: Attribute.String;
    admissionProfile: Attribute.RichText;
    graduateProfile: Attribute.RichText;
    laborField: Attribute.RichText;
    admissionRequirements: Attribute.RichText;
    programStatistics: Attribute.Component<'programs.program-statistics', true>;
    curriculums: Attribute.Component<'programs.curriculum-by-campus', true>;
    curriculumDescription: Attribute.RichText;
    summaries: Attribute.Component<'programs.summary', true>;
  };
}

export interface ProgramsProgramAccordionItem extends Schema.Component {
  collectionName: 'components_programs_program_accordion_items';
  info: {
    displayName: 'ProgramAccordionItem';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    level: Attribute.Relation<
      'programs.program-accordion-item',
      'oneToOne',
      'api::level.level'
    >;
    campus: Attribute.Relation<
      'programs.program-accordion-item',
      'oneToOne',
      'api::campus.campus'
    >;
    modality: Attribute.Relation<
      'programs.program-accordion-item',
      'oneToOne',
      'api::modality.modality'
    >;
  };
}

export interface ProgramsProgramStatistics extends Schema.Component {
  collectionName: 'components_programs_program_statistics';
  info: {
    displayName: 'ProgramStatistics';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    quantity: Attribute.Integer;
    suffix: Attribute.String;
    icon: Attribute.String;
  };
}

export interface ProgramsSchedule extends Schema.Component {
  collectionName: 'components_programs_schedules';
  info: {
    displayName: 'schedule';
  };
  attributes: {
    start_time: Attribute.Time & Attribute.DefaultTo<'19:00'>;
    end_time: Attribute.Time & Attribute.DefaultTo<'22:00'>;
    available_days: Attribute.String & Attribute.DefaultTo<'Martes y Jueves'>;
  };
}

export interface ProgramsSummarySubject extends Schema.Component {
  collectionName: 'components_programs_summary_subjects';
  info: {
    displayName: 'SummarySubject';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface ProgramsSummary extends Schema.Component {
  collectionName: 'components_programs_summaries';
  info: {
    displayName: 'Summary';
  };
  attributes: {
    title: Attribute.String;
    subjects: Attribute.Component<'programs.summary-subject', true>;
  };
}

export interface SectionsAccordionItem extends Schema.Component {
  collectionName: 'components_sections_accordion_items';
  info: {
    displayName: 'AccordionItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface SectionsAccordion extends Schema.Component {
  collectionName: 'components_sections_accordions';
  info: {
    displayName: 'Accordion';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.RichText;
    accordionItems: Attribute.Component<'sections.accordion-item', true>;
  };
}

export interface SectionsAlert extends Schema.Component {
  collectionName: 'components_sections_alerts';
  info: {
    displayName: 'Alert';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    links: Attribute.Component<'sections.link', true>;
    iconName: Attribute.String;
  };
}

export interface SectionsBanner extends Schema.Component {
  collectionName: 'components_sections_banners';
  info: {
    displayName: 'Banner-hero';
    icon: 'audio-description';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    ctaText: Attribute.String;
    ctaUrl: Attribute.String;
    textPosition: Attribute.Enumeration<
      [
        'center',
        'center top',
        'center bottom',
        'left top',
        'left center',
        'left bottom',
        'right top',
        'right center',
        'right bottom'
      ]
    > &
      Attribute.DefaultTo<'left top'>;
    desktopRatio: Attribute.String & Attribute.DefaultTo<'7/2'>;
    desktopImage: Attribute.Media & Attribute.Required;
    tabletRatio: Attribute.String & Attribute.DefaultTo<'7/2'>;
    tabletImage: Attribute.Media;
    mobileRatio: Attribute.String & Attribute.DefaultTo<'4/3'>;
    mobileImage: Attribute.Media;
    overlay: Attribute.Enumeration<['none', 'white', 'black']>;
    contentVariant: Attribute.Enumeration<['light', 'dark']> &
      Attribute.DefaultTo<'light'>;
  };
}

export interface SectionsBlogPostList extends Schema.Component {
  collectionName: 'components_sections_blog_post_lists';
  info: {
    displayName: 'blog_post_list';
  };
  attributes: {
    blog_posts: Attribute.Relation<
      'sections.blog-post-list',
      'oneToMany',
      'api::blog-post.blog-post'
    >;
  };
}

export interface SectionsBlogPostsPodcast extends Schema.Component {
  collectionName: 'components_sections_blog_posts_podcasts';
  info: {
    displayName: 'BlogPostsPodcast';
    description: '';
  };
  attributes: {
    blogPosts: Attribute.Component<'sections.listconfig'>;
    podcastItemsTitle: Attribute.String;
    podcastItems: Attribute.Component<'sections.podcast-item', true>;
    banners: Attribute.Component<'sections.banner', true>;
    ctaText: Attribute.String;
    ctaUrl: Attribute.String;
  };
}

export interface SectionsCardList extends Schema.Component {
  collectionName: 'components_sections_card_lists';
  info: {
    displayName: 'Container-cardList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    cards: Attribute.Component<'sections.card', true>;
  };
}

export interface SectionsCard extends Schema.Component {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'Card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    type: Attribute.Enumeration<['vertical', 'horizontal']> &
      Attribute.DefaultTo<'vertical'>;
    content: Attribute.RichText;
    linkText: Attribute.String;
    linkUrl: Attribute.Text;
    image: Attribute.Media;
    imageAspectRatio: Attribute.String & Attribute.DefaultTo<'2/1'>;
  };
}

export interface SectionsContEdPrograms extends Schema.Component {
  collectionName: 'components_sections_cont_ed_programs';
  info: {
    displayName: 'Container-educacionContinua';
    description: '';
  };
  attributes: {
    knowledgeAreas: Attribute.Relation<
      'sections.cont-ed-programs',
      'oneToMany',
      'api::knowledge-area.knowledge-area'
    >;
  };
}

export interface SectionsContactTargetCard extends Schema.Component {
  collectionName: 'components_sections_contact_target_cards';
  info: {
    displayName: 'ContactTargetCard';
  };
  attributes: {
    image: Attribute.Media;
    title: Attribute.String;
    email: Attribute.Email;
    phone: Attribute.String;
    link: Attribute.String;
  };
}

export interface SectionsContactTargetList extends Schema.Component {
  collectionName: 'components_sections_contact_target_lists';
  info: {
    displayName: 'Container-contactTargetList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.RichText;
    cards: Attribute.Component<'sections.contact-target-card', true>;
  };
}

export interface SectionsContainerOutstandingList extends Schema.Component {
  collectionName: 'components_sections_container_outstanding_lists';
  info: {
    displayName: 'container-outstandingList';
  };
  attributes: {
    title: Attribute.String;
    outstandings: Attribute.Component<'sections.outstanding', true>;
  };
}

export interface SectionsEntryconfig extends Schema.Component {
  collectionName: 'components_sections_entryconfigs';
  info: {
    displayName: 'entryconfig';
    icon: 'apple-alt';
    description: '';
  };
  attributes: {
    relatesto: Attribute.Enumeration<['Blog entry', 'Page entry']> &
      Attribute.Required &
      Attribute.DefaultTo<'Blog entry'>;
    ctaText: Attribute.String;
    ctaUrl: Attribute.Text;
  };
}

export interface SectionsFaqSection extends Schema.Component {
  collectionName: 'components_sections_faq_sections';
  info: {
    displayName: 'Container-FAQsection';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    faqs: Attribute.Component<'sections.listconfig'>;
    faqCategory: Attribute.Relation<
      'sections.faq-section',
      'oneToOne',
      'api::faq-category.faq-category'
    >;
    component: Attribute.Enumeration<['accordion', 'card', 'list']>;
    ctaText: Attribute.String;
    ctaUrl: Attribute.String;
  };
}

export interface SectionsFormContainer extends Schema.Component {
  collectionName: 'components_sections_form_containers';
  info: {
    displayName: 'Container-form';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    privacyPolicy: Attribute.Component<'sections.privacy-policy'>;
    image: Attribute.Media;
    button: Attribute.Component<'molecules.button'>;
    extraText: Attribute.Text;
    form: Attribute.Enumeration<['Clinicas Dentales']>;
    position: Attribute.Enumeration<['left', 'center', 'right']>;
    width: Attribute.Enumeration<
      ['w-12/12', 'w-11/12', 'w-10/12', 'w-9/12', 'w-8/12', 'w-7/12', 'w-6/12']
    >;
    progress: Attribute.Integer &
      Attribute.SetMinMax<{
        max: 100;
      }>;
    errors: Attribute.Component<'sections.web-error', true>;
  };
}

export interface SectionsFormVideo extends Schema.Component {
  collectionName: 'components_sections_form_videos';
  info: {
    displayName: 'Container-formVideo';
    icon: 'archway';
    description: '';
  };
  attributes: {
    formTitle: Attribute.String;
    formDescription: Attribute.Text;
    privacyPolicyText: Attribute.Text;
    privacyPolicy: Attribute.Media;
    formImage: Attribute.Media;
    videoTitle: Attribute.String;
    youtubeId: Attribute.String;
  };
}

export interface SectionsGoogleMap extends Schema.Component {
  collectionName: 'components_sections_google_maps';
  info: {
    displayName: 'GoogleMap';
    description: '';
  };
  attributes: {
    src: Attribute.Text & Attribute.Required;
    name: Attribute.String;
    address: Attribute.Text;
    receptionPhone: Attribute.String;
    admissionPhone: Attribute.String;
    schedule: Attribute.String;
    type: Attribute.Enumeration<['tour', 'map']> & Attribute.DefaultTo<'map'>;
    detailPosition: Attribute.Enumeration<['left', 'right', 'top']>;
  };
}

export interface SectionsHeroSlider extends Schema.Component {
  collectionName: 'components_sections_hero_sliders';
  info: {
    displayName: 'Slider-hero';
    description: '';
  };
  attributes: {
    slide: Attribute.Component<'sections.hero', true>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'ad';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    desktopImage: Attribute.Media & Attribute.Required;
    tabletImage: Attribute.Media;
    mobileImage: Attribute.Media;
    ctaText: Attribute.String;
    ctaUrl: Attribute.String;
    textPosition: Attribute.Enumeration<
      [
        'center',
        'center top',
        'center bottom',
        'left top',
        'left center',
        'left bottom',
        'right top',
        'right center',
        'right bottom'
      ]
    > &
      Attribute.Required;
    overlay: Attribute.Enumeration<['none', 'white', 'black']>;
    contentVariant: Attribute.Enumeration<['light', 'dark']> &
      Attribute.Required;
  };
}

export interface SectionsImageCardList extends Schema.Component {
  collectionName: 'components_sections_image_card_lists';
  info: {
    displayName: 'imageCardList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    orientation: Attribute.Enumeration<['vertical', 'horizontal']> &
      Attribute.Required;
    imageCards: Attribute.Component<'sections.image-card', true>;
  };
}

export interface SectionsImageCard extends Schema.Component {
  collectionName: 'components_sections_image_cards';
  info: {
    displayName: 'imageCard';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    subtitle: Attribute.Text;
    linkIconFirst: Attribute.String;
    linkText: Attribute.String;
    linkIconSecond: Attribute.String;
    linkUrl: Attribute.Text;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SectionsKnowledgeAreaFilter extends Schema.Component {
  collectionName: 'components_sections_knowledge_area_filters';
  info: {
    displayName: 'KnowledgeAreaFilter';
  };
  attributes: {
    area: Attribute.Relation<
      'sections.knowledge-area-filter',
      'oneToOne',
      'api::knowledge-area.knowledge-area'
    >;
  };
}

export interface SectionsLeaderboard extends Schema.Component {
  collectionName: 'components_sections_leaderboards';
  info: {
    displayName: 'Banner-leaderboard';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitleIcon: Attribute.String;
    desktopImage: Attribute.Media & Attribute.Required;
    tabletImage: Attribute.Media;
    mobileImage: Attribute.Media;
    subtitleText: Attribute.Text;
    links: Attribute.Component<'sections.link', true>;
    contentVariant: Attribute.Enumeration<['light', 'dark']> &
      Attribute.Required &
      Attribute.DefaultTo<'light'>;
    button: Attribute.Component<'molecules.button'>;
  };
}

export interface SectionsLevels extends Schema.Component {
  collectionName: 'components_sections_levels';
  info: {
    displayName: 'Levels';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    levels: Attribute.Relation<
      'sections.levels',
      'oneToMany',
      'api::level.level'
    >;
  };
}

export interface SectionsLinkList extends Schema.Component {
  collectionName: 'components_sections_link_lists';
  info: {
    displayName: 'Container-linkList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'sections.link', true>;
  };
}

export interface SectionsLink extends Schema.Component {
  collectionName: 'components_sections_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
    target: Attribute.Enumeration<['_self', '_blank']> &
      Attribute.DefaultTo<'_blank'>;
    iconName: Attribute.String;
    iconPosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    disabled: Attribute.Boolean;
  };
}

export interface SectionsListconfig extends Schema.Component {
  collectionName: 'components_sections_listconfigs';
  info: {
    displayName: 'Container-Listconfig';
    icon: 'tasks';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    maxentries: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<12>;
    relatesto: Attribute.Enumeration<
      ['blogentries', 'pages', 'faq', 'podcasts']
    >;
    sortdate: Attribute.Enumeration<['latest', 'earliest']> &
      Attribute.DefaultTo<'latest'>;
  };
}

export interface SectionsModalityFilter extends Schema.Component {
  collectionName: 'components_sections_modality_filters';
  info: {
    displayName: 'ModalityFilter';
  };
  attributes: {
    modality: Attribute.Relation<
      'sections.modality-filter',
      'oneToOne',
      'api::modality.modality'
    >;
  };
}

export interface SectionsOffer extends Schema.Component {
  collectionName: 'components_sections_offers';
  info: {
    displayName: 'Offer Items';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    levels: Attribute.Relation<
      'sections.offer',
      'oneToMany',
      'api::level.level'
    >;
  };
}

export interface SectionsOutstanding extends Schema.Component {
  collectionName: 'components_sections_outstandings';
  info: {
    displayName: 'OutstandingItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText;
    image: Attribute.Media & Attribute.Required;
    button: Attribute.Component<'molecules.button'>;
    backgroundColor: Attribute.String & Attribute.Required;
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'right'>;
    backgroundWidth: Attribute.Enumeration<['w-full', 'w-3/4']> &
      Attribute.DefaultTo<'w-full'>;
    contentVariant: Attribute.Enumeration<['dark', 'light']> &
      Attribute.DefaultTo<'dark'>;
  };
}

export interface SectionsOverlayCardList extends Schema.Component {
  collectionName: 'components_sections_overlay_card_lists';
  info: {
    displayName: 'OverlayCardList';
    description: '';
  };
  attributes: {
    title: Attribute.Text;
    overlayCards: Attribute.Component<'sections.overlay-card', true>;
  };
}

export interface SectionsOverlayCard extends Schema.Component {
  collectionName: 'components_sections_overlay_cards';
  info: {
    displayName: 'overlayCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.Text & Attribute.Required;
    overlayColor: Attribute.String;
    image: Attribute.Media;
  };
}

export interface SectionsPixel extends Schema.Component {
  collectionName: 'components_sections_pixels';
  info: {
    displayName: 'Pixel';
  };
  attributes: {
    src: Attribute.String & Attribute.Required;
    element: Attribute.Enumeration<['iframe', 'img']>;
  };
}

export interface SectionsPodcastItem extends Schema.Component {
  collectionName: 'components_sections_podcast_items';
  info: {
    displayName: 'PodcastItem';
  };
  attributes: {
    podcastItem: Attribute.Relation<
      'sections.podcast-item',
      'oneToOne',
      'api::podcast.podcast'
    >;
    format: Attribute.Enumeration<['normal', 'compact']>;
  };
}

export interface SectionsPodcastList extends Schema.Component {
  collectionName: 'components_sections_podcast_lists';
  info: {
    displayName: 'EmbedPodcast';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    podcastItems: Attribute.Component<'sections.podcast-item', true>;
  };
}

export interface SectionsPrivacyPolicy extends Schema.Component {
  collectionName: 'components_sections_privacy_policies';
  info: {
    displayName: 'privacyPolicy';
  };
  attributes: {
    text: Attribute.String;
    linkText: Attribute.String;
    file: Attribute.Media & Attribute.Required;
  };
}

export interface SectionsProgramAccordionList extends Schema.Component {
  collectionName: 'components_sections_program_accordion_lists';
  info: {
    displayName: 'ProgramAccordionList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    programAccordionItems: Attribute.Component<
      'programs.program-accordion-item',
      true
    >;
  };
}

export interface SectionsProgramsFilter extends Schema.Component {
  collectionName: 'components_sections_programs_filters';
  info: {
    displayName: 'Container-ProgramsFilter';
    description: '';
  };
  attributes: {
    level: Attribute.Relation<
      'sections.programs-filter',
      'oneToOne',
      'api::level.level'
    >;
    title: Attribute.String;
    description: Attribute.RichText;
  };
}

export interface SectionsPromoLinkList extends Schema.Component {
  collectionName: 'components_sections_promo_link_lists';
  info: {
    displayName: 'Container-PromoLinkList';
    description: '';
  };
  attributes: {
    title: Attribute.Text;
    promoLinks: Attribute.Component<'sections.promo-link', true>;
  };
}

export interface SectionsPromoLink extends Schema.Component {
  collectionName: 'components_sections_promo_links';
  info: {
    displayName: 'PromoLinkItem';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    link: Attribute.Text;
    color: Attribute.String;
  };
}

export interface SectionsRichTextImage extends Schema.Component {
  collectionName: 'components_sections_rich_text_images';
  info: {
    displayName: 'RichTextImage';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media;
    text: Attribute.RichText;
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'right'>;
    backgroundColor: Attribute.String;
    contentVariant: Attribute.Enumeration<['light', 'dark']> &
      Attribute.DefaultTo<'dark'>;
  };
}

export interface SectionsRichTextVideo extends Schema.Component {
  collectionName: 'components_sections_rich_text_videos';
  info: {
    displayName: 'RichTextVideo';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    providerId: Attribute.String;
    videoPosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    contentVariant: Attribute.Enumeration<['dark', 'light']> &
      Attribute.DefaultTo<'dark'>;
    backgroundColor: Attribute.String;
    text: Attribute.RichText;
    provider: Attribute.Enumeration<['Youtube', 'Vimeo']> &
      Attribute.DefaultTo<'Youtube'>;
  };
}

export interface SectionsRockstarInfoList extends Schema.Component {
  collectionName: 'components_sections_rockstar_info_lists';
  info: {
    displayName: 'RockstarInfoList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    rockstars: Attribute.Component<'sections.rockstar-info', true>;
  };
}

export interface SectionsRockstarInfo extends Schema.Component {
  collectionName: 'components_sections_rockstar_infos';
  info: {
    displayName: 'RockstarInfo';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    campus: Attribute.Relation<
      'sections.rockstar-info',
      'oneToOne',
      'api::campus.campus'
    >;
    image: Attribute.Media;
    detail: Attribute.RichText;
  };
}

export interface SectionsScriptPixel extends Schema.Component {
  collectionName: 'components_sections_script_pixels';
  info: {
    displayName: 'ScriptPixel';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    script: Attribute.Text;
    pixel: Attribute.Component<'sections.pixel'>;
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    triggerOnRouteChange: Attribute.Enumeration<
      ['gtagPageview', 'fbqPageview']
    >;
    src: Attribute.String;
    async: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SectionsStatisticsCardList extends Schema.Component {
  collectionName: 'components_sections_statistics_card_lists';
  info: {
    displayName: 'Numbers';
    icon: 'bars';
    description: '';
  };
  attributes: {
    cards: Attribute.Component<'sections.statistics-card', true> &
      Attribute.Required;
  };
}

export interface SectionsStatisticsCard extends Schema.Component {
  collectionName: 'components_sections_statistics_cards';
  info: {
    displayName: 'NumbersItem';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.String;
    maxNumber: Attribute.Integer;
    prefix: Attribute.String;
    suffix: Attribute.String;
    iconName: Attribute.String;
    color: Attribute.String;
    variant: Attribute.Enumeration<['default', 'stroke', 'shadow']> &
      Attribute.DefaultTo<'default'>;
  };
}

export interface SectionsTextContent extends Schema.Component {
  collectionName: 'components_sections_text_contents';
  info: {
    displayName: 'TextContent';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    text: Attribute.RichText;
  };
}

export interface SectionsTextImage extends Schema.Component {
  collectionName: 'components_sections_text_images';
  info: {
    displayName: 'TextImage';
  };
  attributes: {
    content: Attribute.RichText;
    image: Attribute.Media;
  };
}

export interface SectionsWebError extends Schema.Component {
  collectionName: 'components_sections_web_errors';
  info: {
    displayName: 'web error';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    message: Attribute.String;
    button: Attribute.Component<'sections.link'>;
    errorCode: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media & Attribute.Required;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content-relations.conect-content': ContentRelationsConectContent;
      'misc.send-whatsapp': MiscSendWhatsapp;
      'molecules.button': MoleculesButton;
      'programs.curriculum-by-campus': ProgramsCurriculumByCampus;
      'programs.level-page-config': ProgramsLevelPageConfig;
      'programs.modality-feature': ProgramsModalityFeature;
      'programs.program-accordion-item': ProgramsProgramAccordionItem;
      'programs.program-statistics': ProgramsProgramStatistics;
      'programs.schedule': ProgramsSchedule;
      'programs.summary-subject': ProgramsSummarySubject;
      'programs.summary': ProgramsSummary;
      'sections.accordion-item': SectionsAccordionItem;
      'sections.accordion': SectionsAccordion;
      'sections.alert': SectionsAlert;
      'sections.banner': SectionsBanner;
      'sections.blog-post-list': SectionsBlogPostList;
      'sections.blog-posts-podcast': SectionsBlogPostsPodcast;
      'sections.card-list': SectionsCardList;
      'sections.card': SectionsCard;
      'sections.cont-ed-programs': SectionsContEdPrograms;
      'sections.contact-target-card': SectionsContactTargetCard;
      'sections.contact-target-list': SectionsContactTargetList;
      'sections.container-outstanding-list': SectionsContainerOutstandingList;
      'sections.entryconfig': SectionsEntryconfig;
      'sections.faq-section': SectionsFaqSection;
      'sections.form-container': SectionsFormContainer;
      'sections.form-video': SectionsFormVideo;
      'sections.google-map': SectionsGoogleMap;
      'sections.hero-slider': SectionsHeroSlider;
      'sections.hero': SectionsHero;
      'sections.image-card-list': SectionsImageCardList;
      'sections.image-card': SectionsImageCard;
      'sections.knowledge-area-filter': SectionsKnowledgeAreaFilter;
      'sections.leaderboard': SectionsLeaderboard;
      'sections.levels': SectionsLevels;
      'sections.link-list': SectionsLinkList;
      'sections.link': SectionsLink;
      'sections.listconfig': SectionsListconfig;
      'sections.modality-filter': SectionsModalityFilter;
      'sections.offer': SectionsOffer;
      'sections.outstanding': SectionsOutstanding;
      'sections.overlay-card-list': SectionsOverlayCardList;
      'sections.overlay-card': SectionsOverlayCard;
      'sections.pixel': SectionsPixel;
      'sections.podcast-item': SectionsPodcastItem;
      'sections.podcast-list': SectionsPodcastList;
      'sections.privacy-policy': SectionsPrivacyPolicy;
      'sections.program-accordion-list': SectionsProgramAccordionList;
      'sections.programs-filter': SectionsProgramsFilter;
      'sections.promo-link-list': SectionsPromoLinkList;
      'sections.promo-link': SectionsPromoLink;
      'sections.rich-text-image': SectionsRichTextImage;
      'sections.rich-text-video': SectionsRichTextVideo;
      'sections.rockstar-info-list': SectionsRockstarInfoList;
      'sections.rockstar-info': SectionsRockstarInfo;
      'sections.script-pixel': SectionsScriptPixel;
      'sections.statistics-card-list': SectionsStatisticsCardList;
      'sections.statistics-card': SectionsStatisticsCard;
      'sections.text-content': SectionsTextContent;
      'sections.text-image': SectionsTextImage;
      'sections.web-error': SectionsWebError;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
