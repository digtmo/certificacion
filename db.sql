PGDMP     +                    {        
   globalbank    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    73995 
   globalbank    DATABASE     }   CREATE DATABASE globalbank WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE globalbank;
                postgres    false            �            1259    74031    transferencia    TABLE       CREATE TABLE public.transferencia (
    id integer NOT NULL,
    emisor integer NOT NULL,
    receptor integer NOT NULL,
    monto numeric NOT NULL,
    comentario character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public.transferencia;
       public         heap    postgres    false            �            1259    74030    transferencia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transferencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.transferencia_id_seq;
       public          postgres    false    217                       0    0    transferencia_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.transferencia_id_seq OWNED BY public.transferencia.id;
          public          postgres    false    216            �            1259    74021    usuario    TABLE     ?  CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rut character varying(20) NOT NULL,
    direccion character varying(255) NOT NULL,
    saldo numeric DEFAULT 0.00 NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    74020    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    215                       0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    214            l           2604    74034    transferencia id    DEFAULT     t   ALTER TABLE ONLY public.transferencia ALTER COLUMN id SET DEFAULT nextval('public.transferencia_id_seq'::regclass);
 ?   ALTER TABLE public.transferencia ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            j           2604    74024 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                      0    74031    transferencia 
   TABLE DATA           ]   COPY public.transferencia (id, emisor, receptor, monto, comentario, "createdAt") FROM stdin;
    public          postgres    false    217                    0    74021    usuario 
   TABLE DATA           V   COPY public.usuario (id, nombre, correo, password, rut, direccion, saldo) FROM stdin;
    public          postgres    false    215   t                  0    0    transferencia_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transferencia_id_seq', 75, true);
          public          postgres    false    216                       0    0    usuario_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuario_id_seq', 19, true);
          public          postgres    false    214            q           2606    74039     transferencia transferencia_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.transferencia
    ADD CONSTRAINT transferencia_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.transferencia DROP CONSTRAINT transferencia_pkey;
       public            postgres    false    217            o           2606    74029    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    215            r           2606    74050 '   transferencia transferencia_emisor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transferencia
    ADD CONSTRAINT transferencia_emisor_fkey FOREIGN KEY (emisor) REFERENCES public.usuario(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.transferencia DROP CONSTRAINT transferencia_emisor_fkey;
       public          postgres    false    3183    217    215            s           2606    74055 )   transferencia transferencia_receptor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transferencia
    ADD CONSTRAINT transferencia_receptor_fkey FOREIGN KEY (receptor) REFERENCES public.usuario(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.transferencia DROP CONSTRAINT transferencia_receptor_fkey;
       public          postgres    false    215    3183    217               V   x�]˱�0D�ڞ���ę�!h�Ѱ�HZ���WWB%42���IEK�H�E�]5+B|����A����:~B��r���)�����         �   x�}��� E��W�mxPڲi�f�]�mU"CQߊ[�p�3ܓ���e~1�3��K)����'��>x@� �jD�uq�������.D�8
�b	��h���O�K
�U[�B�6��I�A\Ja ��{��[��B����uմ�P� fשd�} u7C!     