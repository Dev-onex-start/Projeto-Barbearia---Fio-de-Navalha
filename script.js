// Gerenciamento de Navegação entre Páginas
document.addEventListener('DOMContentLoaded', function () {

    // Modal de Boas-vindas (apenas na página inicial)
    const modal = document.getElementById('welcomeModal');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        // Mostrar modal ao carregar a página
        modal.style.display = 'flex';

        // Fechar modal ao clicar no X
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Fechar modal ao clicar fora do conteúdo
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Fechar modal com a tecla ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // Navegação entre páginas
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Função de navegação com transição suave
    function navigateToPage(page) {
        // Adicionar efeito de fade out
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        // Aguardar a transição e navegar
        setTimeout(() => {
            if (page === 'index') {
                window.location.href = 'index.html';
            } else {
                window.location.href = page + '.html';
            }
        }, 300);
    }

    // Efeito de fade in ao carregar a página
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Scroll suave para links âncora
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Verificar se não é apenas "#"
            if (href !== '#' && href.length > 1) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animação de scroll reveal para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards
    const cards = document.querySelectorAll('.servico-card, .produto-card, .info-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const mensagem = document.getElementById('mensagem').value;

            // Validação básica
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Simular envio do formulário
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');

            // Limpar formulário
            contactForm.reset();
        });
    }

    // Botões de consultar disponibilidade de produtos via WhatsApp
    const btnComprar = document.querySelectorAll('.btn-comprar');

    btnComprar.forEach(btn => {
        btn.addEventListener('click', function () {
            const produtoNome = this.parentElement.querySelector('h3').textContent;
            const mensagem = `Olá! Gostaria de saber sobre a disponibilidade de: ${produtoNome}`;
            const whatsappUrl = `https://wa.me/556295553522?text=${encodeURIComponent(mensagem)}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    //Botão de chamada WhatsApp flutuante
    const whatsappButton = document.querySelector('.whatsapp-float');
    whatsappButton.addEventListener('click', function () {
        const mensagem = `E ae parceria! Vim pelo seu site e gostaria de marcar um horário meu barbeiro lindo fiu fiu. 
        Ps: Lucão te mandou um bjo no coração ❤️`;
        const whatsappUrl = `https://wa.me/556295553522?text=${encodeURIComponent(mensagem)}`;

        window.open(whatsappUrl, '_blank');
    });


    // Animação do Header ao Scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll para baixo - esconder header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima - mostrar header
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
        }

        lastScroll = currentScroll;
    });

    // Adicionar transição ao header
    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    // Destacar seção ativa no menu durante scroll (para página inicial)
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        window.addEventListener('scroll', function () {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const page = link.getAttribute('data-page');
                if (page === 'index' && current) {
                    // Apenas destacar se estiver na página inicial
                }
            });
        });
    }

    // Efeito parallax suave no hero
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Contador animado para estatísticas
    const stats = document.querySelectorAll('.stat h3');

    if (stats.length > 0) {
        const animateCounter = (element) => {
            const target = parseInt(element.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '%');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
                }
            };

            updateCounter();
        };

        // Observer para iniciar animação quando visível
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Log de carregamento
    console.log('Barbearia Fio de Navalha - Sistema de navegação carregado com sucesso!');
});

// Prevenir comportamento padrão de alguns links
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});