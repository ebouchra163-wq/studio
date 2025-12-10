export type Post = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageId: string;
};


export const posts: Post[] = [
  {
    id: 1,
    slug: 'tendencias-logisticas-2024',
    title: '5 Tendencias Logísticas a Seguir en 2024',
    date: '2024-08-01T10:00:00.000Z',
    excerpt:
      "La industria logística está evolucionando rápidamente. Desde la automatización hasta la sostenibilidad, exploramos las tendencias clave que darán forma a 2024 y más allá.",
    content: `
        <p>La industria logística se encuentra en un estado constante de cambio, impulsada por los avances tecnológicos, las cambiantes expectativas de los consumidores y un enfoque creciente en la sostenibilidad. A medida que avanzamos en 2024, varias tendencias clave están destinadas a remodelar el panorama logístico.</p>
        
        <h3>1. Automatización y Robótica</h3>
        <p>La automatización ya no es cosa del futuro; está aquí. Los almacenes están adoptando cada vez más sistemas de clasificación automatizados, vehículos de guiado autónomo (AGV) y drones para la gestión de inventario. Estas tecnologías aumentan la eficiencia, reducen el error humano y aceleran el cumplimiento de los pedidos.</p>

        <h3>2. Sostenibilidad en la Cadena de Suministro</h3>
        <p>Las prácticas ecológicas son ahora una prioridad. Las empresas están invirtiendo en vehículos eléctricos, optimizando rutas para reducir emisiones y adoptando embalajes sostenibles. Una cadena de suministro verde no solo es buena para el planeta, sino que también atrae a los consumidores con conciencia ecológica.</p>

        <h3>3. Toma de Decisiones Basada en Datos</h3>
        <p>El Big Data y la analítica están revolucionando la gestión logística. Al analizar grandes conjuntos de datos, las empresas pueden prever la demanda, optimizar los niveles de inventario e identificar posibles interrupciones antes de que ocurran, lo que conduce a operaciones más resistentes y eficientes.</p>

        <h3>4. El Auge de la Logística de Última Milla</h3>
        <p>Con el auge del comercio electrónico, la última milla de la entrega se ha convertido en un campo de batalla crítico. Las empresas están experimentando con soluciones innovadoras como la entrega colaborativa (crowdsourcing), puntos de recogida y taquillas autónomas para proporcionar entregas más rápidas y flexibles.</p>

        <h3>5. Digitalización y Visibilidad en Tiempo Real</h3>
        <p>La tecnología Blockchain y los sensores de IoT están proporcionando una visibilidad sin precedentes en toda la cadena de suministro. Los transportistas pueden rastrear sus mercancías en tiempo real, monitorear las condiciones (como la temperatura) y garantizar la autenticidad y seguridad de sus productos.</p>

        <p>Adoptar estas tendencias será crucial para las empresas de logística que buscan mantenerse competitivas en un mercado dinámico.</p>
      `,
    imageId: 'blog-post-1',
  },
  {
    id: 2,
    slug: 'importancia-de-la-logistica-inversa',
    title: 'La Creciente Importancia de la Logística Inversa',
    date: '2024-07-25T14:30:00.000Z',
    excerpt:
      'La logística inversa, la gestión de devoluciones y reciclaje, ya no es una ocurrencia tardía. Descubra por qué un proceso eficiente de logística inversa es vital para la satisfacción del cliente y la sostenibilidad.',
    content: `
        <p>Tradicionalmente, la logística se ha centrado en el movimiento hacia adelante de los productos desde el fabricante hasta el consumidor. Sin embargo, el flujo inverso de mercancías, conocido como logística inversa, está adquiriendo una inmensa importancia en el panorama actual del comercio electrónico.</p>
        
        <h3>¿Qué es la Logística Inversa?</h3>
        <p>La logística inversa se refiere a todos los procesos involucrados en la devolución de productos de un cliente a un vendedor o fabricante. Esto incluye devoluciones de clientes, reparación y mantenimiento, reempaquetado para reventa, reciclaje y eliminación adecuada.</p>

        <h3>¿Por qué es tan importante?</h3>
        <p><strong>1. Satisfacción del Cliente:</strong> Un proceso de devoluciones fácil y sin complicaciones es un motor clave de la lealtad del cliente. Es más probable que los compradores en línea compren a un minorista que ofrece devoluciones sencillas.</p>
        <p><strong>2. Impacto Financiero:</strong> La gestión eficiente de las devoluciones puede recuperar un valor significativo de los bienes devueltos. Los productos pueden ser reacondicionados, reempaquetados y revendidos, convirtiendo una pérdida potencial en una ganancia.</p>
        <p><strong>3. Sostenibilidad:</strong> Una logística inversa eficaz es un componente central de la economía circular. En lugar de terminar en vertederos, los productos pueden ser reparados, reutilizados o reciclados, minimizando los residuos y el impacto ambiental.</p>

        <h3>Desafíos en la Logística Inversa</h3>
        <p>La gestión del flujo inverso presenta desafíos únicos. Los volúmenes son impredecibles, la calidad de los productos devueltos varía y la logística puede ser más compleja y costosa que la logística directa. Sin embargo, invertir en un sistema robusto de logística inversa ya no es opcional; es esencial para el éxito a largo plazo.</p>
      `,
    imageId: 'blog-post-2',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
